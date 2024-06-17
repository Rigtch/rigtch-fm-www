'use client'

import { FaPlay, FaPause } from 'react-icons/fa'

import { Button } from '@app/components/ui/button'

export interface ToggleStateButtonProps {
  isPlaying: boolean
  isDeviceAvailable: boolean
  hasAccess: boolean
  toggleState: () => Promise<void>
}

export function ToggleStateButton({
  isPlaying,
  isDeviceAvailable,
  toggleState,
  hasAccess,
}: ToggleStateButtonProps) {
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
