import { putPlayerPause, putPlayerResume } from '@api/fetchers'
import { useAuthCookies } from '@hooks/use-auth-cookies'

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
