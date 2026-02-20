import { Elysia } from 'elysia'
import { openapi } from '@elysiajs/openapi'

import { authGuardPlugin } from './plugins/auth-guard-plugin'
import { globalErrorPlugin } from './plugins/global-error-plugin';
import { registerPublicRoutes } from './routes/publicRoutes';
import { registerAuthRoutes } from './routes/authRoutes';
import { registerUserRoutes } from './routes/usersRoutes';
import { registerTeacherRoutes } from './routes/teachersRoutes';
import { formatDate } from './utils/globalUtils';


export function createBaseApp() {
  const app: Elysia<'/api'> = new Elysia({ prefix: '/api' });

  app.onBeforeHandle(({ store, request }) => {
    // starttijd opslaan
    // @ts-ignore
    store.startTime = performance.now()
    // @ts-ignore
    store.method = request.method
    // @ts-ignore
    store.path = new URL(request.url).pathname
  })
    .onAfterHandle(({ store }) => {
      const now = new Date()
      const formatted = formatDate(now)

      // @ts-ignore
      const start = store.startTime as number
      const duration = performance.now() - start

      // @ts-ignore
      const method = store.method as string
      // @ts-ignore
      const path = store.path as string

      console.log(
        `[${formatted}] ${method} ${path} - ${duration.toFixed(2)}ms`
      )
    })
    .use(openapi({
      documentation: {
        info: {
          title: 'Mijn IT Academy API',
          version: '1.0.0',
          description: 'Duidelijke documentatie voor alle endpoints',
        },
      }
    }))
    .use(authGuardPlugin)
    .use(globalErrorPlugin);

  // Register public routes by returning the app instance
  registerPublicRoutes(app);
  registerAuthRoutes(app);
  registerUserRoutes(app);
  registerTeacherRoutes(app);

  return app;
}

export type App = ReturnType<typeof createBaseApp>;
