import { RegisterForm } from '@/components/web/auth/RegisterForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/register')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    // <div className="flex items-center justify-center min-h-screen">
    <div className="">
      <RegisterForm />
    </div>
  )
}
