import { SpotifyResponse, TimeRange, Track } from '../types'

import { environment } from '@config/environment'

export async function getTopTracks(
  token?: string,
  timeRange = TimeRange.LONG_TERM,
  limit = 10,
  offset = 1
): Promise<SpotifyResponse<Track, true>> {
  const urlSearchParameters = new URLSearchParams({
    timeRange,
    limit: limit + '',
    offset: offset + '',
  })

  const response = await fetch(
    `${
      environment.API_URL
    }/statistics/top-tracks?${urlSearchParameters.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if ([401, 403].includes(response.status)) throw new Error(response.statusText)

  return await response.json()
}
