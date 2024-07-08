import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

import { PLAYBACK_STATE } from '../constants'
import { getPlaybackState } from '../fetchers'

import { ID } from '@app/constants'
import { useToken } from '@app/hooks/use-token'

export const usePlaybackStateQuery = () => {
  const [refetchInterval, setRefetchInterval] = useState(1000)
  const token = useToken()
  const params = useParams()

  const userId = params[ID].toString()

  const query = useQuery({
    queryKey: [PLAYBACK_STATE],
    queryFn: () =>
      getPlaybackState(token, {
        userId,
      }),
    refetchInterval,
  })

  useEffect(() => {
    if (query.error) setRefetchInterval(10_000)
  }, [query.error])

  return query
}
