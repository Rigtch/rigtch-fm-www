import { GetTopItemsParams, TimeRange } from '../types'

import { fetchApi } from './fetch-api'

export function getTopGenres(
  token: string,
  { userId, timeRange = TimeRange.LONG_TERM, limit = 10 }: GetTopItemsParams
) {
  const searchParams = new URLSearchParams({
    timeRange,
    limit: limit + '',
  })

  return fetchApi<{ genres: string[] }>(
    `/users/${userId}/profile/top/genres?${searchParams.toString()}`,
    {
      token,
    }
  )
}
