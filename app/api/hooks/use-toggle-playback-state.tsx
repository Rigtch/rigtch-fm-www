import { useParams } from 'next/navigation'

import { putPlayerPause, putPlayerResume } from '../fetchers'

import { useToken } from '@app/hooks/use-token'
import type { ParamsWithId } from '@app/types'

export const useTogglePlaybackStateQuery = () => {
  const token = useToken()
  const { id: userId } = useParams<ParamsWithId>()

  function toggle(isPlaying = false) {
    return isPlaying
      ? putPlayerPause(token, { userId })
      : putPlayerResume(token, { userId })
  }

  return {
    toggle,
  }
}
