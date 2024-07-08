import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

import { PLAYBACK_STATE } from '../constants'
import { getPlaybackState } from '../fetchers'

import { useToken } from '@app/hooks/use-token'
import type { ParamsWithId } from '@app/types'

export const usePlaybackStateQuery = () => {
  const [refetchInterval, setRefetchInterval] = useState(1000)
  const token = useToken()
  const { id: userId } = useParams<ParamsWithId>()

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
