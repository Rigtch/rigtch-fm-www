'use client'

import { Button } from '@components/ui/button'
import { environment } from '@config/environment'

export function ConnectButton() {
  return (
    <Button
      onClick={() => window.open(`${environment.API_URL}/auth/login`, '_self')}
      variant="success"
    >
      Connect
    </Button>
  )
}
