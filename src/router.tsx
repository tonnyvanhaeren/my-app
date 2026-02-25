import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

import { MyRouterContext } from './routes/__root'
import { queryClient } from './queryClient'

export function getRouter() {
  const router = createTanStackRouter({
    routeTree,

    context: {
      queryClient,
      user: null,
    } satisfies MyRouterContext,

    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
