import { useQuery } from '@tanstack/react-query'
import { useCookies } from 'react-cookie'

import { ACCESS_TOKEN, PLAYBACK_STATE } from '~/api/constants'
import { getPlaybackState } from '~/api/fetchers'

export const usePlaybackState = () => {
  const [cookie] = useCookies([ACCESS_TOKEN])

  return useQuery(
    [PLAYBACK_STATE],
    () => getPlaybackState(cookie[ACCESS_TOKEN]),
    {
      refetchInterval: 1000,
    }
  )
}
