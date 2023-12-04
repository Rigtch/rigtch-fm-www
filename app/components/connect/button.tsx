'use client'

import Link from 'next/link'

import { Button } from '../ui/button'

import { env } from '@app/config/env'
import { Profile } from '@app/api/types'

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
  profile?: Profile
}

export function ConnectButton({
  className,
  variant,
  profile,
}: ConnectButtonProps) {
  return (
    <Button asChild variant={variant} className={className}>
      <Link
        href={profile ? '/profile' : `${env.NEXT_PUBLIC_API_URL}/auth/login`}
      >
        {profile ? 'Go to your profile' : 'Connect'}
      </Link>
    </Button>
  )
}
