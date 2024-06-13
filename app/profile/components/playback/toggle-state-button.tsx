'use client'

import { FaPlay, FaPause } from 'react-icons/fa'

import { Button } from '@app/components/ui/button'

export interface PlaybackToggleStateButtonProps {
  isPlaying: boolean
  isDeviceAvailable: boolean
  hasAccess: boolean
  toggleState: () => Promise<void>
}

export function PlaybackToggleStateButton({
  isPlaying,
  isDeviceAvailable,
  toggleState,
  hasAccess,
}: PlaybackToggleStateButtonProps) {
  return (
    <Button
      variant="ghost"
      className="rounded-full"
      size="icon"
      disabled={!isDeviceAvailable || !hasAccess}
      onClick={() => toggleState()}
    >
      {isPlaying ? <FaPause /> : <FaPlay className="ml-[1px]" />}
    </Button>
  )
}
