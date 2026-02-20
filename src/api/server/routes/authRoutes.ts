import Elysia, { t } from 'elysia';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../utils/jwtUtils';
import { AuthService } from '../services/authServices';
import { cookieSchema } from '../endpointSchemas/cookieSchemas';
import { loginSchema, registerSchema } from '../endpointSchemas/authSchemas';
import { defaultErrorSchema } from '../errorClasses/errors';
import { singleUserResponseSchema } from '../endpointSchemas/userSchemas';

const authService = await AuthService.getInstance();

export function registerAuthRoutes(app: Elysia<'/api'>) {
  app.group('/auth', app =>
    app
      .post('/login', async ({ body, cookie: { access, refresh } }) => {
        const user = await authService.login(body)

        const accessToken = await signAccessToken({ sub: user.id, email: user.email, role: user.role });
        const refreshToken = await signRefreshToken({ sub: user.email });

        access.set({
          value: accessToken,
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          maxAge: 15 * 60 // 15 minuten
        })

        refresh.set({
          value: refreshToken,
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          maxAge: 7 * 24 * 60 * 60 // 7 days
        })

        return;
      },
        {
          body: loginSchema,
          cookie: t.Cookie({
            access: t.Optional(t.String()),
            refresh: t.Optional(t.String())
          }),
          response: {
            200: t.Void(),
            401: defaultErrorSchema,
            404: defaultErrorSchema,
            422: defaultErrorSchema,
          },
          detail: { tags: ["Auth"], description: 'Set access and refresh cookies when successfull' },
        })
      .post('/register', async ({ body, set }) => {
        const user = await authService.register(body);

        set.status = 201
        set.headers['location'] = `/users/id/${user.id}`

        return {
          success: true,
          data: user
        }
      },
        {
          body: registerSchema,
          response: {
            201: singleUserResponseSchema,
            409: defaultErrorSchema,
            422: defaultErrorSchema,
          },
          detail: { tags: ["Auth"] },
        })
      .post('/refresh', async ({ cookie: { access, refresh } }) => {
        // const { refresh } = cookie

        const payload = await verifyRefreshToken(refresh.value);
        const user = await authService.getUserByEmail(payload.sub!);

        const accessToken = await signAccessToken({ sub: user.id, email: user.email, role: user.role });
        const refreshToken = await signRefreshToken({ sub: user.email });

        access.set({
          value: accessToken,
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          maxAge: 15 * 60 // 15 minuten
        })

        refresh.set({
          value: refreshToken,
          httpOnly: true,
          secure: true,
          sameSite: 'strict',
          maxAge: 7 * 24 * 60 * 60 // 7 days
        })

        return new Response(null, {
          status: 204
        });
      },
        {
          cookie: cookieSchema,
          response: {
            204: t.Void(),
            422: defaultErrorSchema,
            401: defaultErrorSchema,
            404: defaultErrorSchema
          },
          detail: {
            tags: ["Auth"],
            description: 'Set new access & refresh cookies if recent Refresh is valid'
          },
        })
      .post('/logout', ({ cookie: { access, refresh } }) => {
        access.remove();
        refresh.remove();

        return new Response(null, {
          status: 204
        });

      }, {
        cookie: t.Cookie({
          access: t.Optional(t.String()),
          refresh: t.Optional(t.String())
        }),
        response: {
          204: t.Void()
        },
        detail: { tags: ["Auth"] },
      })
  )

  return app;
}

