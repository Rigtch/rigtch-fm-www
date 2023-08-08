import { Track } from '../types'

import { environment } from '@config/environment'

export async function getLastTracks(token?: string): Promise<Track[]> {
  const response = await fetch(
    `${environment.API_URL}/statistics/last-tracks`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if ([401, 403].includes(response.status)) throw new Error(response.statusText)

  return await response.json()
}
