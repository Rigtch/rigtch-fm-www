import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { PLAYBACK_STATE } from '@api/constants'
import { getPlaybackState } from '@api/fetchers'
import { useAuthCookies } from '@hooks/use-auth-cookies'

export const usePlaybackStateQuery = () => {
  const [refetchInterval, setRefetchInterval] = useState(1000)
  const { accessToken } = useAuthCookies()

  const query = useQuery(
    [PLAYBACK_STATE],
    () => getPlaybackState(accessToken),
    {
      refetchInterval,
    }
  )

  useEffect(() => {
    if (query.error) setRefetchInterval(10_000)
  }, [query.error])

  return query
}
