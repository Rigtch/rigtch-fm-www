'use client'

import { Button } from '../ui/button'

import { environment } from '@app/config/environment'

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
