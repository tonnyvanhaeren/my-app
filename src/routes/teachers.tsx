import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/teachers')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/teachers"!</div>
}
