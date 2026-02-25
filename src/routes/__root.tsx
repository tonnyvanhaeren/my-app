import {
  HeadContent,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { Toaster } from 'sonner'


import { TanStackQueryProvider } from '../integrations/tanstack-query/TanstackQueryProvider';

import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

import appCss from '../styles.css?url'


import { MainNavbar } from '@/components/web/navigation/Main-Navbar';
import { NotFound } from '@/components/web/NotFound';
import { ThemeProvider } from '@/lib/theme';
import { fetchCurrentuser } from '@/server/auth';
import { AuthProvider, User } from '@/server/AuthContext';


// export interface MyRouterContext {
//   queryClient: QueryClient
//   auth: {
//     isAuthenticated: boolean;
//     user: {
//       sub: string;
//       email: string;
//       role: string;
//     } | null;
//   };
// }

export type RouterContext = {
  user: User | null
}

export const Route = createRootRouteWithContext<RouterContext>()({
  beforeLoad: async ({ }) => {
    // const auth = await getSessionFromCookie();
    const user = await fetchCurrentuser();
    console.log('Result : ', user);
    //console.log('ALL-', all)

    return { user } as RouterContext
  },

  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFound,

})

function RootDocument({ children }: { children: React.ReactNode }) {
  const { user } = Route.useRouteContext()
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className=''>
        <ThemeProvider>
          <AuthProvider initialUser={user}>
            <TanStackQueryProvider>
              <MainNavbar />
              {children}
              <Toaster />
              <TanStackDevtools
                config={{
                  position: 'bottom-right',
                }}
                plugins={[
                  {
                    name: 'Tanstack Router',
                    render: <TanStackRouterDevtoolsPanel />,
                  },
                  TanStackQueryDevtools,
                ]}
              />

              <Scripts />
            </TanStackQueryProvider>
          </AuthProvider>

        </ThemeProvider>


      </body>
    </html>
  )
}
