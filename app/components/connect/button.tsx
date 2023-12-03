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
<<<<<<< HEAD
    <Button asChild variant={variant} className={className}>
=======
    <Button
      onClick={() =>
        window.open(`${env.NEXT_PUBLIC_API_URL}/auth/login`, '_self')
      }
      asChild
      variant={variant}
      className={className}
    >
>>>>>>> 6a508db (feat(page): justify gaps)
      <Link href={`${env.NEXT_PUBLIC_API_URL}/auth/login`}>Connect</Link>
    </Button>
  )
}
