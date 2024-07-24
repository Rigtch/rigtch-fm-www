import { redirect, useParams } from 'next/navigation'

import { putPlayerPause, putPlayerResume } from '../fetchers'

import { useToken } from '@app/auth/hooks'
import type { ParamsWithId } from '@app/types'

export const useTogglePlaybackStateQuery = () => {
  const { id: userId } = useParams<ParamsWithId>()
  const token = useToken()

  if (!token) redirect('/')

  function toggle(isPlaying = false) {
    return isPlaying
      ? putPlayerPause(token!, { userId })
      : putPlayerResume(token!, { userId })
  }

  return {
    toggle,
  }
}
