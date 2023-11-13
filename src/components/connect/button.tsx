'use client'

import { environment } from '@config/environment'
import { Button } from '@components/ui/button'

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
