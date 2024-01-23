import { CopyIcon } from '@radix-ui/react-icons'

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
    <Button variant="ghost" onClick={() => saveProfileURL()}>
      <CopyIcon />
    </Button>
  )
}
