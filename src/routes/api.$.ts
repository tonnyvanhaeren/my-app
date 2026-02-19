// src/routes/api.$.ts
import { treaty } from '@elysiajs/eden'
import { createFileRoute } from '@tanstack/react-router'
import { createIsomorphicFn } from '@tanstack/react-start'

import { createBaseApp, type App } from '../api/server/app'

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

// Eden infers treaty shape from App['~Routes']. Composition via .use(register*)
// loses that inference, so we assert the app has the 'api' prefix shape.
type AppWithApiPrefix = App & { '~Routes': { api: Record<string, unknown> } }

export const getTreaty = createIsomorphicFn()
  .server(() => treaty<AppWithApiPrefix>(app as AppWithApiPrefix).api)
  .client(() => {
    const origin =
      typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'
    return treaty<AppWithApiPrefix>(origin).api
  })
