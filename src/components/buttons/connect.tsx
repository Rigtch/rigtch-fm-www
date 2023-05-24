import { Button, ButtonProps } from 'primereact/button'

import { environment } from '~/config'

export function ConnectButton(props: ButtonProps) {
  return (
    <Button
      {...props}
      severity="success"
      onClick={() => window.open(`${environment.API_URL}/auth/login`, '_self')}
    >
      Connect
    </Button>
  )
}
