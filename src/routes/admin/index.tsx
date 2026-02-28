import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin/')({
  component: AdminDashboard,
})

function AdminDashboard() {
  return (
    <div>
      <h1>Admin dashboard</h1>
      <p>Welkom in het admin-gedeelte.</p>
    </div>
  )
}
