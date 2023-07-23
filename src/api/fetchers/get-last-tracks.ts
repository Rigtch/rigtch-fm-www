import { Track } from '../types'

import { environment } from '@config'

export async function getLastTracks(token?: string): Promise<Track[]> {
  const response = await fetch(
    `${environment.API_URL}/statistics/last-tracks`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (response.status === 401) throw new Error(response.statusText)

  return await response.json()
}
