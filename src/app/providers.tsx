'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'
import { getCookie, setCookie } from 'cookies-next'

import { PlaybackStateProvider } from '@context/playback-state'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@api/constants'
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
              ) {
                const { accessToken, expiresIn } = await getRefresh(
                  refreshToken
                )

                console.log('refreshing token')

                setCookie(ACCESS_TOKEN, accessToken, {
                  maxAge: expiresIn,
                  path: '/',
                })
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
