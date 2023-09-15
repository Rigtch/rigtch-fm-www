import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

import { TOP_TRACKS } from '@api/constants'
import { getTopTracks } from '@api/fetchers'
import { TimeRange } from '@api/types'
import { useAuthCookies } from '@hooks/use-auth-cookies'

export const useTopTracksQuery = (
  timeRange = TimeRange.LONG_TERM,
  limit = 10
) => {
  const { accessToken } = useAuthCookies()

  return useQuery([TOP_TRACKS], () =>
    getTopTracks(accessToken, timeRange, limit)
  )
}

export const useTopTracksInfiniteQuery = (
  timeRange = TimeRange.LONG_TERM,
  limit = 20
) => {
  const { accessToken } = useAuthCookies()

  return useInfiniteQuery(
    [TOP_TRACKS, timeRange],
    ({ pageParam = 0 }) =>
      getTopTracks(accessToken, timeRange, limit, pageParam),
    {
      getNextPageParam: lastPage =>
        lastPage.next ? lastPage.offset + limit : undefined,
    }
  )
}
