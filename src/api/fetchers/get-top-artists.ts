import { Artist, TimeRange } from '../types'

import { environment } from '@config/environment'

export async function getTopArtists(
  token?: string,
  timeRange = TimeRange.LONG_TERM
): Promise<Artist[]> {
  const response = await fetch(
    `${environment.API_URL}/statistics/top-artists?timeRange=${timeRange}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if ([401, 403].includes(response.status)) throw new Error(response.statusText)

  return await response.json()
}
