// app/components/navbar.tsx
import * as React from "react"
import { Link, useRouterState } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ModeToggle } from "./mode-toggle"

const mainLinks = [
  { label: "Home", href: "/home" },

  { label: "Teachers", href: "/teachers" },
  { label: "Courses", href: "/courses" },
  { label: "Events", href: "/events" },
  { label: "Users", href: "/users" },
]

const authLinks = [
  { label: "Login", href: "/auth/login" },
  { label: "Register", href: "/auth/register" },
  { label: "Logout", href: "/auth/logout" },
  { label: "Profile", href: "/auth/profile" },
]

export function MainNavbar() {
  const [open, setOpen] = React.useState(false)

  const pathname = useRouterState({
    select: (s) => s.location.pathname,
  })

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname.startsWith(href)

  return (
    <nav className="border-b bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4">
        {/* Left: logo / title */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold"><img src="/ITSchoolLogo.jpg" alt="head" width={150} height={100} /></span>
        </div>

        {/* Desktop nav */}
        <div className="hidden flex-1 items-center justify-between md:flex md:ml-6">
          <div className="flex items-center gap-4">
            {mainLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                active={isActive(link.href)}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ModeToggle />
            {authLinks.map((link) => (
              <NavButtonLink
                key={link.href}
                href={link.href}
                label={link.label}
                active={isActive(link.href)}
              />
            ))}
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Open navigation menu"
        >
          <span className="sr-only">Toggle navigation</span>
          <svg
            className={cn("h-6 w-6 transition-transform", open && "rotate-90")}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {open ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t bg-background md:hidden">
          <div className="space-y-1 px-4 pt-2 pb-3">
            {mainLinks.map((link) => (
              <MobileNavLink
                key={link.href}
                href={link.href}
                label={link.label}
                active={isActive(link.href)}
                onClick={() => setOpen(false)}
              />
            ))}
          </div>
          <div></div>
          <div className="border-t px-4 py-3 space-y-1">
            {authLinks.map((link) => (
              <MobileNavLink
                key={link.href}
                href={link.href}
                label={link.label}
                active={isActive(link.href)}
                onClick={() => setOpen(false)}
              />
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

type NavLinkProps = {
  href: string
  label: string
  active?: boolean
}

function NavLink({ href, label, active }: NavLinkProps) {
  return (
    <Link
      to={href}
      className={cn(
        "text-sm font-medium transition-colors text-orange-400 hover:text-foreground/80",
        active ? "text-orange-400 border-b-2 border-b-orange-400" : "text-foreground/60"
      )}
    >
      {label}
    </Link>
  )
}

function NavButtonLink({ href, label, active }: NavLinkProps) {
  return (
    <Link to={href}>
      <Button
        variant={active ? "default" : "outline"}
        size="sm"
        className={cn(active && "font-semibold")}
      >
        {label}
      </Button>
    </Link>
  )
}

type MobileNavLinkProps = NavLinkProps & {
  onClick?: () => void
}

function MobileNavLink({ href, label, active, onClick }: MobileNavLinkProps) {
  return (
    <Link
      to={href}
      onClick={onClick}
      className={cn(
        "flex items-center rounded-md px-3 py-2 text-base font-medium hover:bg-accent hover:text-accent-foreground",
        active ? "bg-accent text-accent-foreground" : "text-foreground/80"
      )}
    >
      {label}
    </Link>
  )
}
