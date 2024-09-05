import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { redirect, useParams } from 'next/navigation'

import { PLAYBACK_STATE } from '../constants'
import { getPlaybackState } from '../fetchers'

import { useToken } from '@app/auth/hooks'
import type { ParamsWithId } from '@app/types'
import { isPublicUser } from '@app/profile/utils/helpers'

export const usePlaybackStateQuery = () => {
  const [refetchInterval, setRefetchInterval] = useState(1000)
  const { id: userId } = useParams<ParamsWithId>()
  const token = useToken()

  if (!token && !isPublicUser(userId)) redirect('/')

  const query = useQuery({
    queryKey: [PLAYBACK_STATE],
    queryFn: () =>
      getPlaybackState(token ?? '', {
        userId,
      }),
    refetchInterval,
  })

  useEffect(() => {
    if (query.error) setRefetchInterval(10_000)
  }, [query.error])

  return query
}
