import { useParams } from 'next/navigation'

import { putPlayerPause, putPlayerResume } from '../fetchers'

import { USER_ID } from '@app/constants'
import { useAuthCookies } from '@app/hooks/use-auth-cookies'

export const useTogglePlaybackStateQuery = () => {
  const { accessToken } = useAuthCookies()
  const params = useParams()

  const userId = params[USER_ID].toString()

  function toggle(isPlaying = false) {
    return isPlaying
      ? putPlayerPause(accessToken, { userId })
      : putPlayerResume(accessToken, { userId })
  }

  return {
    toggle,
  }
}
