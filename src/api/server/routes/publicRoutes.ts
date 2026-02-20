// src/api/public.ts
import type { Elysia } from 'elysia'

export function registerPublicRoutes(app: Elysia<'/api'>) {
  app.get('/health', () => ({ status: 'ok' }))

  app.get('/me', () => {
    return { success: true }
  })

  return app
}
