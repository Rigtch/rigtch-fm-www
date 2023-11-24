'use client'

import Link from 'next/link'

import { Button } from '../ui/button'

import { environment } from '@app/config/environment'

export function ConnectButton() {
  return (
    <Button
      onClick={() => window.open(`${environment.API_URL}/auth/login`, '_self')}
      asChild
      variant="success"
    >
      <Link href={`${environment.API_URL}/auth/login`}>Connect</Link>
    </Button>
  )
}
