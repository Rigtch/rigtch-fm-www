'use client'

import { Share1Icon } from '@radix-ui/react-icons'

import { Button } from '@app/components/ui/button'
import { toast } from '@app/components/ui/use-toast'

async function saveProfileURL() {
  await navigator.clipboard.writeText(window.location.href)

  toast({
    title: 'URL copied to clipboard!',
  })
}

export function ShareButton() {
  return (
    <Button
      variant="outline"
      className="flex flex-row gap-2 hover:bg-white"
      onClick={saveProfileURL}
    >
      Share <Share1Icon />
    </Button>
  )
}
