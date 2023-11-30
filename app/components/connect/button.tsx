'use client'

import Link from 'next/link'

import { Button } from '../ui/button'

import { env } from '@app/config/env'

export interface ConnectButtonProps {
  className?: string
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
    | 'success'
    | null
    | undefined
}

export function ConnectButton({ className, variant }: ConnectButtonProps) {
  return (
    <Button asChild variant={variant} className={className}>
      <Link href={`${env.NEXT_PUBLIC_API_URL}/auth/login`}>Connect</Link>
    </Button>
  )
}
