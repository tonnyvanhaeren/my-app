import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/courses')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className='mt-5'>
      <div>
        <h1 className='text-3xl text-orange-500'>Cursussen</h1>
      </div>
    </div>
  )
}
