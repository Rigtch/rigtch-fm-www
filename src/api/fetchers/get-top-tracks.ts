import { TimeRange, Track } from '../types'

import { environment } from '@config/environment'

export async function getTopTracks(
  token?: string,
  timeRange = TimeRange.LONG_TERM
): Promise<Track[]> {
  const response = await fetch(
    `${environment.API_URL}/statistics/top-tracks?timeRange=${timeRange}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if ([401, 403].includes(response.status)) throw new Error(response.statusText)

  return await response.json()
}
