import { useParams } from 'next/navigation'

import { putPlayerPause, putPlayerResume } from '../fetchers'

import { USER_ID } from '@app/constants'
import { useToken } from '@app/hooks/use-token'

export const useTogglePlaybackStateQuery = () => {
  const token = useToken()
  const params = useParams()

  const userId = params[USER_ID].toString()

  function toggle(isPlaying = false) {
    return isPlaying
      ? putPlayerPause(token, { userId })
      : putPlayerResume(token, { userId })
  }

  return {
    toggle,
  }
}
