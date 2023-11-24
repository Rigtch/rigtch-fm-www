import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { PLAYBACK_STATE } from '../constants'
import { getPlaybackState } from '../fetchers'

import { useAuthCookies } from '@app/hooks/use-auth-cookies'

export const usePlaybackStateQuery = () => {
  const [refetchInterval, setRefetchInterval] = useState(1000)
  const { accessToken } = useAuthCookies()

  const query = useQuery({
    queryKey: [PLAYBACK_STATE],
    queryFn: () => getPlaybackState(accessToken),
    refetchInterval,
  })

  useEffect(() => {
    if (query.error) setRefetchInterval(10_000)
  }, [query.error])

  return query
}
