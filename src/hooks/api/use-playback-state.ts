import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'

import { ACCESS_TOKEN, PLAYBACK_STATE } from '@api/constants'
import { getPlaybackState } from '@api/fetchers'

export const usePlaybackStateQuery = () => {
  const [refetchInterval, setRefetchInterval] = useState(1000)
  const [cookie] = useCookies([ACCESS_TOKEN])

  const query = useQuery(
    [PLAYBACK_STATE],
    () => getPlaybackState(cookie[ACCESS_TOKEN]),
    {
      refetchInterval,
    }
  )

  useEffect(() => {
    if (query.error) setRefetchInterval(10_000)
  }, [query.error])

  return query
}
