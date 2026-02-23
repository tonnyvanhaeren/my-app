import Elysia from "elysia"

export const registerTeacherRoutes = new Elysia()
  .group('/teachers', app =>
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