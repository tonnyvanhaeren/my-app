// src/api/public.ts
import { Elysia } from 'elysia'

export const registerPublicRoutes = new Elysia()
  .get('/health', () => ({ status: 'ok' }))
