import { fetchApi } from './fetch-api'

import { TimeRange } from '@api/types'

export async function getTopGenres(
  token?: string,
  timeRange = TimeRange.LONG_TERM
) {
  const urlSearchParameters = new URLSearchParams({
    timeRange,
  })

  return fetchApi<{ genres: string[] }>(
    `/statistics/top-genres?${urlSearchParameters.toString()}`,
    { token }
  )
}
