'use client'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'
import type { Session } from 'next-auth'

import type { LayoutProps } from './types'

export interface RootProvidersProps extends LayoutProps {
  session: Session
}

export function RootProviders({ children, session }: RootProvidersProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        {children}

        <SpeedInsights />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </SessionProvider>
  )
}
