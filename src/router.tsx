import { createBrowserRouter } from 'react-router-dom'
import GeneralError from './pages/errors/general-error'
import NotFoundError from './pages/errors/not-found-error'
import MaintenanceError from './pages/errors/maintenance-error'
import UnauthorisedError from './pages/errors/unauthorised-error.tsx'
import ProtectedRoute from './components/common/ProtectedRoute.tsx'

const router = createBrowserRouter(
  [
    // Auth routes
    {
      path: '/login',
      lazy: async () => ({
        Component: (await import('./pages/auth/login')).default,
      }),
    },
    {
      path: '/sign-up',
      lazy: async () => ({
        Component: (await import('./pages/auth/sign-up')).default,
      }),
    },
    {
      path: '/forgot-password',
      lazy: async () => ({
        Component: (await import('./pages/auth/forgot-password')).default,
      }),
    },
    {
      path: '/otp',
      lazy: async () => ({
        Component: (await import('./pages/auth/otp')).default,
      }),
    },

    // Main routes
    {
      path: '/',
      lazy: async () => {
        const AppShell = await import('./components/app-shell')
        return {
          Component: (props) => (
            <ProtectedRoute>
              <AppShell.default {...props} />
            </ProtectedRoute>
          ),
        }
      },
      errorElement: <GeneralError />,
      children: [
        {
          index: true,
          lazy: async () => ({
            Component: (await import('./pages/dashboard')).default,
          }),
        },
        {
          path: 'stock-management',
          lazy: async () => ({
            Component: (await import('@/pages/stock-management')).default,
          }),
        },
        {
          path: 'signal-chat',
          lazy: async () => ({
            Component: (await import('@/pages/signal-chat')).default,
          }),
        },
        {
          path: 'tasks',
          lazy: async () => ({
            Component: (await import('@/pages/tasks')).default,
          }),
        },
        {
          path: 'chats',
          lazy: async () => ({
            Component: (await import('@/pages/chats')).default,
          }),
        },
        {
          path: 'apps',
          lazy: async () => ({
            Component: (await import('@/pages/apps')).default,
          }),
        },
        {
          path: 'settings',
          lazy: async () => ({
            Component: (await import('./pages/settings')).default,
          }),
          errorElement: <GeneralError />,
          children: [
            {
              index: true,
              lazy: async () => ({
                Component: (await import('./pages/settings/profile')).default,
              }),
            },
            {
              path: 'account',
              lazy: async () => ({
                Component: (await import('./pages/settings/account')).default,
              }),
            },
          ],
        },
      ],
    },

    // Error routes
    { path: '/500', Component: GeneralError },
    { path: '/404', Component: NotFoundError },
    { path: '/503', Component: MaintenanceError },
    { path: '/401', Component: UnauthorisedError },

    // Fallback 404 route
    { path: '*', Component: NotFoundError },
  ],
  {
    future: {
      v7_relativeSplatPath: true, // Enables relative paths in nested routes
      v7_fetcherPersist: true, // Retains fetcher state during navigation
      v7_normalizeFormMethod: true, // Normalizes form methods (e.g., POST or GET)
      v7_partialHydration: true, // Supports partial hydration for server-side rendering
      v7_skipActionErrorRevalidation: true, // Prevents revalidation when action errors occur
    },
  }
)

export default router
