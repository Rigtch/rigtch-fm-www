import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

import { PLAYBACK_STATE } from '../constants'
import { getPlaybackState } from '../fetchers'

import { useAuthCookies } from '@app/hooks/use-auth-cookies'
import { USER_ID } from '@app/constants'

export const usePlaybackStateQuery = () => {
  const [refetchInterval, setRefetchInterval] = useState(1000)
  const { accessToken } = useAuthCookies()
  const params = useParams()

  const userId = params[USER_ID].toString()

  const query = useQuery({
    queryKey: [PLAYBACK_STATE],
    queryFn: () =>
      getPlaybackState(accessToken, {
        userId,
      }),
    refetchInterval,
  })

  useEffect(() => {
    if (query.error) setRefetchInterval(10_000)
  }, [query.error])

  return query
}
