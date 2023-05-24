import { useRouter } from 'next/router'
import { Button, ButtonProps } from 'primereact/button'
import { useCookies } from 'react-cookie'

import { ACCESS_TOKEN, REFRESH_TOKEN } from '~/common/constants'
import { useAuth } from '~/hooks/auth'

export function DisconnectButton(props: ButtonProps) {
  const [, , removeCookies] = useCookies([ACCESS_TOKEN, REFRESH_TOKEN])
  const router = useRouter()
  const { setProfile } = useAuth()

  function handleDisconnect() {
    removeCookies(ACCESS_TOKEN)
    removeCookies(REFRESH_TOKEN)

    setProfile(undefined)

    router.push('/about')
  }

  return (
    <Button {...props} severity="danger" onClick={handleDisconnect}>
      Disconnect
    </Button>
  )
}
