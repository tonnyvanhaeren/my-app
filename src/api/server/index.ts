// src/index.ts
import { createBaseApp } from './app'
import { authRoutes } from './routes/authRoutes'
import { usersRoutes } from './routes/usersRoutes'
import { testRoutes } from './routes/testRoutes'
import { teacherRoutes } from './routes/teachersRoutes'

export const app = createBaseApp()
  // routes
  .use(authRoutes)
  .use(usersRoutes)
  .use(testRoutes)
  .use(teacherRoutes)
// .all('/*', ({ request, set }) => {
//   set.status = 404

//   return { success: false, message: "page not found" }
// })
// .listen(3001)

console.log(`Server draait op ${app.server?.hostname}:${app.server?.port}`);



