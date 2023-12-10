import { Artist, SpotifyResponseWithOffset, TimeRange } from '../types'

import { fetchApi } from './fetch-api'

export async function getTopArtists(
  token?: string,
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
    `/statistics/top/artists?${urlSearchParameters.toString()}`,
    { token }
  )
}
