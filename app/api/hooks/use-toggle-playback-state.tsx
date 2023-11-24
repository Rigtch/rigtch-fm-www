import { putPlayerPause, putPlayerResume } from '../fetchers'

import { useAuthCookies } from '@app/hooks/use-auth-cookies'

export const useTogglePlaybackStateQuery = () => {
  const { accessToken } = useAuthCookies()

  function toggle(isPlaying = false) {
    return isPlaying
      ? putPlayerPause(accessToken)
      : putPlayerResume(accessToken)
  }

  return {
    toggle,
  }
}
