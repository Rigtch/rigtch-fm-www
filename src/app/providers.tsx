'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'
import { getCookie } from 'cookies-next'

import { PlaybackStateProvider } from '@context/playback-state'
import { REFRESH_TOKEN } from '@api/constants'
import { getRefresh } from '@api/fetchers'

export interface ProvidersProps {
  children: ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  const refreshToken = getCookie(REFRESH_TOKEN)

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            onError: async error => {
              if (
                error instanceof Error &&
                error.message === 'The access token expired' &&
                refreshToken
              )
                await getRefresh(refreshToken)
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
