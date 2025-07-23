import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/theme-provider'
import { LanguageProvider } from '@/components/language-provider'
import router from '@/router'
import '@/index.css'
import { changeThemeColor } from './utils/changeThemeColor'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Confirm from '@/components/dialog/confirm'
import Guide from '@/components/guide'

changeThemeColor()

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      // staleTime: STALE_TIME_DEFAULT,
      // gcTime: GARBAGE_COLLECTION_INTERVAL,
      // refetchInterval: REFETCH_INTERVAL_LONG,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme='light' storageKey='vite-ui-theme'>
        <LanguageProvider defaultLanguage='ko' storageKey='vite-ui-language'>
          <RouterProvider router={router} />
          <Toaster />
          <Confirm />
          <Guide />
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
