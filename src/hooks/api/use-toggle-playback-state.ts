import { useCookies } from 'react-cookie'

import { ACCESS_TOKEN } from '~/api/constants'
import { putPlayerPause, putPlayerResume } from '~/api/fetchers'

export const useTogglePlaybackState = () => {
  const [cookie] = useCookies([ACCESS_TOKEN])

  function toggle(isPlaying = false) {
    return isPlaying
      ? putPlayerPause(cookie[ACCESS_TOKEN])
      : putPlayerResume(cookie[ACCESS_TOKEN])
  }

  return {
    toggle,
  }
}
