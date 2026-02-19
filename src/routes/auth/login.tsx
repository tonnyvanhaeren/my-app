import { createFileRoute } from '@tanstack/react-router'
import { LoginForm } from '@/components/web/auth/LoginForm'

export const Route = createFileRoute('/auth/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    // <div className="flex items-center justify-center min-h-screen">
    <div className="">
      <LoginForm />
    </div>
  )
}
