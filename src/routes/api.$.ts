import { createFileRoute } from '@tanstack/react-router'
// src/routes/api.$.ts
import { treaty } from '@elysiajs/eden'
// import { createFileRoute } from '@tanstack/react-router'


import type { App } from '../api/server/app'
import { app } from '../api/server/app'



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
});


export const api = treaty<App>('http://localhost:3000')

// export const getTreaty = createIsomorphicFn()
//   .server(() => treaty(app).api)
//   .client(() => treaty<typeof app>('localhost:3000').api)

// export const getTreaty = createIsomorphicFn()
//   .server(() => treaty(app))                  // geen .api
//   .client(() => treaty<typeof app>('/api'))   // baseUrl = /api


// export const getTreaty = createIsomorphicFn()
//   .server(() => treaty(app).api)
//   .client(() => {
//     const origin =
//       typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'
//     return treaty(origin).api
//   })