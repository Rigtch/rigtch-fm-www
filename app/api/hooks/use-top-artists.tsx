import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

import { TimeRange } from '../types'
import { TOP_ARTISTS } from '../constants'
import { getTopArtists } from '../fetchers'

import { useAuthCookies } from '@app/hooks/use-auth-cookies'

export const useTopArtistsQuery = (
  timeRange = TimeRange.LONG_TERM,
  limit = 10
) => {
  const { accessToken } = useAuthCookies()

  return useQuery([TOP_ARTISTS], () =>
    getTopArtists(accessToken, timeRange, limit)
  )
}

export const useTopArtistsInfiniteQuery = (
  timeRange = TimeRange.LONG_TERM,
  limit = 20
) => {
  const { accessToken } = useAuthCookies()

  return useInfiniteQuery(
    [TOP_ARTISTS, timeRange],
    ({ pageParam = 0 }) =>
      getTopArtists(accessToken, timeRange, limit, pageParam),
    {
      getNextPageParam: lastPage =>
        lastPage.next ? lastPage.offset + limit : undefined,
    }
  )
}
