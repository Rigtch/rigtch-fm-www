import { fetchApi } from '../fetch-api'

import { TimeRange } from '@app/api/types'

export function getUserProfileTopGenres(
  token?: string,
  userId?: string,
  timeRange = TimeRange.LONG_TERM,
  limit = 10
) {
  const urlSearchParameters = new URLSearchParams({
    timeRange,
    limit: limit + '',
  })

  return fetchApi<{ genres: string[] }>(
    `/users/${userId}/profile/top/genres?${urlSearchParameters.toString()}`,
    { token }
  )
}
