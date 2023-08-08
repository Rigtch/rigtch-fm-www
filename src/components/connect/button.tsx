import { Button, ButtonProps } from 'primereact/button'
import { classNames } from 'primereact/utils'

import { environment } from '@config/environment'

export function ConnectButton({ className, ...props }: ButtonProps) {
  return (
    <Button
      {...props}
      severity="success"
      className={classNames(
        'justify-content-center text-white flex',
        className
      )}
      onClick={() => window.open(`${environment.API_URL}/auth/login`, '_self')}
    >
      Connect
    </Button>
  )
}
