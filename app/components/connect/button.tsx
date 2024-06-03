'use client'

import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { CgSpinnerAlt } from 'react-icons/cg'

import { Button, ButtonProps } from '../ui/button'

import { useAuthCookies } from '@app/hooks/use-auth-cookies'

export interface ConnectButtonProps {
  className?: string
  variant?: ButtonProps['variant']
}

export function ConnectButton({ className, variant }: ConnectButtonProps) {
  const { userId } = useAuthCookies()
  const router = useRouter()
  const { status } = useSession()

  useEffect(() => {
    if (status === 'authenticated') router.push(`/profile/${userId}`)
  }, [status, userId, router])

  return (
    <Button
      variant={variant}
      className={className}
      disabled={['loading', 'authenticated'].includes(status)}
      onClick={() => signIn('spotify')}
    >
      {['loading', 'authenticated'].includes(status) ? (
        <>
          <CgSpinnerAlt className="mr-2 h-4 w-4 animate-spin" />
          Loading profile...
        </>
      ) : (
        <>Connect</>
      )}
    </Button>
  )
}
