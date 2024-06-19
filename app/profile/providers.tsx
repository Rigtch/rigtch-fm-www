'use client'

import { PlaybackStateProvider } from '@app/profile/context/playback-state'
import type { LayoutProps } from '@app/types'

export function ProfileProviders({ children }: LayoutProps) {
  return <PlaybackStateProvider>{children}</PlaybackStateProvider>
}
