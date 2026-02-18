// src/routes/api.$.ts
import { treaty } from '@elysiajs/eden'
import { createFileRoute } from '@tanstack/react-router'
import { createIsomorphicFn } from '@tanstack/react-start'

import { createBaseApp } from '../api/server/app'

const app = createBaseApp()

const handle = ({ request }: { request: Request }) => app.fetch(request)

export const Route = createFileRoute('/api/$')({
  server: {
    handlers: {
      GET: handle,
      POST: handle,
      PUT: handle,
      PATCH: handle,
      DELETE: handle,
    },
  },
})

export const getTreaty = createIsomorphicFn()
  .server(() => treaty(app).api)
  .client(() => {
    const origin =
      typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'
    return treaty<typeof app>(origin).api
  })
