'use client'

import { FaPlay, FaPause } from 'react-icons/fa'

import { Button } from '@components/ui/button'

export interface PlaybackStateToggleButtonProps {
  isPlaying: boolean
  isDeviceAvailable: boolean
  toggleState: () => Promise<void>
}

export function PlaybackStateToggleButton({
  isPlaying,
  isDeviceAvailable,
  toggleState,
}: PlaybackStateToggleButtonProps) {
  return (
    <Button
      variant="ghost"
      className="rounded-full"
      size="icon"
      disabled={!isDeviceAvailable}
      onClick={() => toggleState()}
    >
      {isPlaying ? <FaPause /> : <FaPlay className="ml-[1px]" />}
    </Button>
  )
}
