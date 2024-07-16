'use client'

import { FaPlay, FaPause } from 'react-icons/fa'

import { Button } from '@app/components/ui/button'

namespace ToggleStateButton {
  export interface Props {
    isPlaying: boolean
    isDeviceAvailable: boolean
    hasAccess: boolean
    toggleState: () => Promise<void>
  }
}

function ToggleStateButton({
  isPlaying,
  isDeviceAvailable,
  toggleState,
  hasAccess,
}: ToggleStateButton.Props) {
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

export { ToggleStateButton }
