import { fetchApi } from '../fetch-api'

import { Artist, SpotifyResponseWithOffset, TimeRange } from '@app/api/types'

export function getUserProfileTopArtists(
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

  return fetchApi<SpotifyResponseWithOffset<Artist>>(
    `/users/${userId}/profile/top/artists?${urlSearchParameters.toString()}`,
    { token }
  )
}
