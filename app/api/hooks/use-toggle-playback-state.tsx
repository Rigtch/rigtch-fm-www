import { useParams } from 'next/navigation'

import { putPlayerPause, putPlayerResume } from '../fetchers'

import { useToken } from '@app/auth/hooks'
import type { ParamsWithId } from '@app/types'

export const useTogglePlaybackStateQuery = () => {
  const { id: userId } = useParams<ParamsWithId>()
  const token = useToken()

  function toggle(isPlaying = false) {
    if (isPlaying) {
      return putPlayerPause(token ?? '', { userId })
    }

    return putPlayerResume(token ?? '', { userId })
  }

  return {
    toggle: token
      ? toggle
      : () => ({
          success: false,
        }),
  }
}
