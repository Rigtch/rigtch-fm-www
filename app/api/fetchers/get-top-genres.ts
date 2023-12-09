import { TimeRange } from '../types'

import { fetchApi } from './fetch-api'

export async function getTopGenres(
  token?: string,
  timeRange = TimeRange.LONG_TERM,
  limit = 10
) {
  const urlSearchParameters = new URLSearchParams({
    timeRange,
    limit: limit + '',
  })

  return fetchApi<{ genres: string[] }>(
    `/statistics/top/genres?${urlSearchParameters.toString()}`,
    { token }
  )
}
