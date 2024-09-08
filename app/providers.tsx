'use client'

import { SessionProvider } from 'next-auth/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react'
import type { Session } from 'next-auth'

import type { LayoutProps } from './types'

namespace RootProviders {
  export type Props = Readonly<
    LayoutProps & {
      session: Session
    }
  >
}

function RootProviders({ children, session }: RootProviders.Props) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        {children}

        <ReactQueryDevtools />
      </QueryClientProvider>
    </SessionProvider>
  )
}

export { RootProviders }
