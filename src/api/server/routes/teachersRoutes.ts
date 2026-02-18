import Elysia from "elysia"

export function registerTeacherRoutes(app: Elysia<'api'>) {
  app.group('/teachers', app =>
    app.get('/', ({ requireRole, userId, role }) => {
      requireRole('teacher')

      return {
        userId,
        role,
        data: 'teacher dashboard'
      }
    }, {
      auth: true,
      detail: {
        tags: ["Teachers"]
      }
    })
  )
  return app;
}