// NavLink.tsx
import { cn } from '@/lib/utils'
import { Link, useMatch } from '@tanstack/react-router'

type NavLinkProps = {
  to: string
  children: React.ReactNode
  from?: string // optional explicit route id/path
}

export function NavLinkMobile({ to, children, from }: NavLinkProps) {
  const match = useMatch({
    from: from ?? to,     // route id or path pattern, eg '/posts'
    shouldThrow: false,   // don't throw if not currently rendered
  })

  const isActive = !!match

  return (
    <Link
      to={to}
      className={cn(
        "text-sm font-medium px-4 py-2 hover:bg-orange-400 rounded-lg",
        isActive ? "bg-orange-400 rounded-lg" : "text-white"
      )}
    // className={isActive ? 'nav-link nav-link-active' : 'nav-link'}
    >
      {children}
    </Link>
  )
}
