import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useCookies } from 'react-cookie'

import { ACCESS_TOKEN, TOP_ARTISTS } from '@api/constants'
import { getTopArtists } from '@api/fetchers'
import { TimeRange } from '@api/types'

export const useTopArtistsQuery = (
  timeRange = TimeRange.LONG_TERM,
  limit = 10
) => {
  const [cookie] = useCookies([ACCESS_TOKEN])

  return useQuery([TOP_ARTISTS], () =>
    getTopArtists(cookie[ACCESS_TOKEN], timeRange, limit)
  )
}

export const useTopArtistsInfiniteQuery = (
  timeRange = TimeRange.LONG_TERM,
  limit = 20
) => {
  const [cookie] = useCookies([ACCESS_TOKEN])

  return useInfiniteQuery(
    [TOP_ARTISTS, timeRange],
    ({ pageParam = 0 }) =>
      getTopArtists(cookie[ACCESS_TOKEN], timeRange, limit, pageParam),
    {
      getNextPageParam: lastPage =>
        lastPage.next ? lastPage.offset + limit : undefined,
    }
  )
}
