'use client'

import Link from 'next/link'

import { Button, ButtonProps } from '../ui/button'

import { env } from '@app/config/env'
import { Profile } from '@app/api/types'
import { useAuthCookies } from '@app/hooks/use-auth-cookies'

export interface ConnectButtonProps {
  className?: string
  variant?: ButtonProps['variant']
  profile?: Profile
}

export function ConnectButton({
  className,
  variant,
  profile,
}: ConnectButtonProps) {
  const { userId } = useAuthCookies()

  return (
    <Button asChild variant={variant} className={className}>
      <Link
        href={
          profile
            ? `/profile/${userId}`
            : `${env.NEXT_PUBLIC_API_URL}/auth/login`
        }
      >
        {profile ? 'Go to your profile' : 'Connect'}
      </Link>
    </Button>
  )
}
