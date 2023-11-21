'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'
import { useRouter } from 'next/navigation'

import { PlaybackStateProvider } from '@context/playback-state'

export interface ProvidersProps {
  children: ReactNode
}

export default function Providers({ children }: ProvidersProps) {
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
    <QueryClientProvider client={queryClient}>
      <PlaybackStateProvider>{children}</PlaybackStateProvider>
    </QueryClientProvider>
  )
}
