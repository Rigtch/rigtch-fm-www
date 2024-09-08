import { Button, type ButtonProps } from '../ui/button'

import { handleSignIn } from '@app/auth/actions'

namespace ConnectButton {
  export type Props = Readonly<{
    className?: string
    variant?: ButtonProps['variant']
  }>
}

function ConnectButton({ className, variant }: ConnectButton.Props) {
  return (
    <form action={handleSignIn}>
      <Button variant={variant} className={className} type="submit">
        Connect
      </Button>
    </form>
  )
}

export { ConnectButton }
