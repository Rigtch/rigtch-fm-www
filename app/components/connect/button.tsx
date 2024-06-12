import { Button, ButtonProps } from '../ui/button'

import { handleSignIn } from '@app/auth/actions'

export interface ConnectButtonProps {
  className?: string
  variant?: ButtonProps['variant']
}

export function ConnectButton({ className, variant }: ConnectButtonProps) {
  return (
    <form action={handleSignIn}>
      <Button variant={variant} className={className} type="submit">
        Connect
      </Button>
    </form>
  )
}
