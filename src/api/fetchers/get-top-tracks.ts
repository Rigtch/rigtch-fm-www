import { SpotifyResponseWithOffset, TimeRange, Track } from '../types'

import { fetchApi } from './fetch-api'

export async function getTopTracks(
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

  return fetchApi<SpotifyResponseWithOffset<Track>>(
    `/statistics/top-tracks?${urlSearchParameters.toString()}`,
    { token }
  )
}
