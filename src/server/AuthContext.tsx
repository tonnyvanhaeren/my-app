// src/auth/AuthContext.tsx
import { queryClient } from '@/queryClient'
import { api } from '@/routes/api.$'
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'

export type User = {
  sub: string
  email: string
  role: string
}

export type AuthState = {
  isAuthenticated: boolean
  user: User | null
}

type AuthContextValue = {
  auth: AuthState
  setUser: (user: User | null) => void
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({
  initialUser,
  children,
}: {
  initialUser: User | null
  children: ReactNode
}) {
  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: !!initialUser,
    user: initialUser,
  })

  const setUser = (user: User | null) => {
    setAuth({
      isAuthenticated: !!user,
      user,
    })
  }

  const logout = async () => {
    try {
      const { error } = await api.api.auth.logout.post();
      if (error) throw new Error(error.value.message);
      setAuth({ isAuthenticated: false, user: null });
      queryClient.clear(); // Clear alle cached data
    } catch (error) {
      throw new Error('Logout mislukt');
    }
  }

  // Optioneel: reageren op server‑navigaties met nieuwe initialUser
  useEffect(() => {
    setAuth({
      isAuthenticated: !!initialUser,
      user: initialUser,
    })
  }, [initialUser])

  return (
    <AuthContext.Provider value={{ auth, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
