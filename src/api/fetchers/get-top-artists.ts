import { Artist } from '../types'

import { environment } from '~/config'

export async function getTopArtists(token?: string): Promise<Artist[]> {
  const response = await fetch(
    `${environment.API_URL}/statistics/top-artists`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if (response.status === 401) throw new Error(response.statusText)

  return await response.json()
}
