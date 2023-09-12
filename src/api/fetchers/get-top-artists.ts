import { Artist, SpotifyResponseWithOffset, TimeRange } from '../types'

import { environment } from '@config/environment'

export async function getTopArtists(
  token?: string,
  timeRange = TimeRange.LONG_TERM,
  limit = 10,
  offset = 0
): Promise<SpotifyResponseWithOffset<Artist>> {
  const urlSearchParameters = new URLSearchParams({
    timeRange,
    limit: limit + '',
    offset: offset + '',
  })

  const response = await fetch(
    `${
      environment.API_URL
    }/statistics/top-artists?${urlSearchParameters.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if ([401, 403].includes(response.status)) throw new Error(response.statusText)

  return await response.json()
}
