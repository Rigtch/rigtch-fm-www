import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useCookies } from 'react-cookie'

import { ACCESS_TOKEN, TOP_TRACKS } from '@api/constants'
import { getTopTracks } from '@api/fetchers'
import { TimeRange } from '@api/types'

export const useTopTracksQuery = (
  timeRange = TimeRange.LONG_TERM,
  limit = 10
) => {
  const [cookies] = useCookies([ACCESS_TOKEN])

  return useQuery([TOP_TRACKS], () =>
    getTopTracks(cookies[ACCESS_TOKEN], timeRange, limit)
  )
}

export const useTopTracksInfiniteQuery = (
  timeRange = TimeRange.LONG_TERM,
  limit = 20
) => {
  const [cookies] = useCookies([ACCESS_TOKEN])

  return useInfiniteQuery(
    [TOP_TRACKS, timeRange],
    ({ pageParam = 0 }) =>
      getTopTracks(cookies[ACCESS_TOKEN], timeRange, limit, pageParam),
    {
      getNextPageParam: lastPage =>
        lastPage.next ? lastPage.offset + limit : undefined,
    }
  )
}
