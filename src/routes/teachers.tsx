import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/teachers')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='mt-5'>
      <div>
        <h1 className='text-3xl text-orange-500'>Teachers</h1>
      </div>
    </div>
  )

}
