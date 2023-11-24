'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { LayoutProps } from './types'

export function RootProviders({ children }: LayoutProps) {
  const router = useRouter()

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            onError: async error => {
              if (
                error instanceof Error &&
                error.message === 'The access token expired'
              ) {
                console.log('e', error.message)
                console.log(error.message === 'The access token expired')
                router.refresh()
              }
            },
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
