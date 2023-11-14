'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'

import { PlaybackStateProvider } from '@context/playback-state'

export interface ProvidersProps {
  children: ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <PlaybackStateProvider>{children}</PlaybackStateProvider>
    </QueryClientProvider>
  )
}
