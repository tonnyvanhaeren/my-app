import { createFileRoute, redirect } from '@tanstack/react-router'
import { Outlet, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/admin')({
  beforeLoad: ({ context, location }) => {
    const { user } = context

    console.log('User ', user);

    const isAdmin = !!user && user.role === 'admin'

    if (!isAdmin) {
      // niet ingelogd of geen admin → redirect
      throw redirect({
        to: '/auth/login',
        search: {
          redirect: location.href, // zodat je daarna kan terugsturen
        },
      })
    }
  },
  component: AdminLayout,
})

function AdminLayout() {
  return (
    <div className="flex">
      <aside className="w-64 bg-gray-200 p-4">
        <h2 className="text-xl font-bold mb-4">Admin</h2>
        <nav>
          <ul className="space-y-2">
            <li>
              <Link to="/admin/users" className="block hover:underline">
                Users
              </Link>
            </li>
            <li>
              <Link to="/admin/teachers" className="block hover:underline">
                Teachers
              </Link>
            </li>
            <li>
              <Link to="/admin/courses" className="block hover:underline">
                Courses
              </Link>
            </li>
            <li>
              <Link to="/admin/events" className="block hover:underline">
                Events
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  )
}
