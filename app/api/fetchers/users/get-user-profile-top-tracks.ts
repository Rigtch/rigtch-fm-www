import { fetchApi } from '../fetch-api'

import { SpotifyResponseWithOffset, TimeRange, Track } from '@app/api/types'

export function getUserProfileTopTracks(
  token?: string,
  userId?: string,
  timeRange = TimeRange.LONG_TERM,
  limit = 10,
  offset = 0
) {
  const urlSearchParameters = new URLSearchParams({
    timeRange,
    limit: limit + '',
    offset: offset + '',
  })

  return fetchApi<SpotifyResponseWithOffset<Track>>(
    `/users/${userId}/profile/top/tracks?${urlSearchParameters.toString()}`,
    { token }
  )
}
