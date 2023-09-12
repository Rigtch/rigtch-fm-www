import { Button, ButtonProps } from '@material-tailwind/react'

import { environment } from '@config/environment'

export function ConnectButton() {
  return (
    <Button
      // {...props}
      color="green"
      // className={classNames(
      //   'justify-content-center text-white flex',
      //   className
      // )}
      onClick={() => window.open(`${environment.API_URL}/auth/login`, '_self')}
    >
      Connect
    </Button>
  )
}
