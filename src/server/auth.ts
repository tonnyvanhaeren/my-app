import { verifyAccessToken } from '@/api/server/utils/jwtUtils';
import { createServerFn } from '@tanstack/react-start'
import { getRequestHeaders } from '@tanstack/react-start/server'

type User = {
  sub: string
  email: string
  role: string
}

export const fetchCurrentuser = createServerFn({ method: 'GET' }).handler(async () => {
  const headers = getRequestHeaders()

  const accessToken: string = headers
    .get('cookie')
    ?.split('; ')
    .find((row: string) => row.startsWith('access='))
    ?.split('=')[1];

  if (!accessToken) {
    return null
  }

  try {
    const { sub, email, role } = await verifyAccessToken(accessToken)

    const user: User = {
      sub: sub!,
      email,
      role,
    }
    return user;
  } catch (error) {
    return null
  }
})

// TODO: delete function

export const getSessionFromCookie = createServerFn({ method: 'GET' }).handler(
  async () => {
    const headers = getRequestHeaders()

    const accessToken: string = headers
      .get('cookie')
      ?.split('; ')
      .find((row: string) => row.startsWith('access='))
      ?.split('=')[1];

    if (!accessToken) {
      return null
    }

    //check accesstoken
    try {
      const { sub, email, role } = await verifyAccessToken(accessToken)
      return {
        isAuthenticated: true,
        user: {
          sub,
          email,
          role,
        }
      };
    } catch (error) {
      return {
        isAuthenticated: false,
        user: null
      };
    }
  }
)
