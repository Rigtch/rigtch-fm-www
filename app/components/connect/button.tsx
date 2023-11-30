'use client'

import Link from 'next/link'

import { Button } from '../ui/button'

import { env } from '@app/config/env'

export function ConnectButton() {
  return (
    <Button asChild variant="success">
      <Link href={`${env.NEXT_PUBLIC_API_URL}/auth/login`}>Connect</Link>
    </Button>
  )
}
