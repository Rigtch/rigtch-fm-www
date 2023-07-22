import { PlaybackState } from '../types'

import { environment } from '~/config'

export async function getPlaybackState(token?: string): Promise<PlaybackState> {
  const response = await fetch(`${environment.API_URL}/player/state`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if ([401, 403].includes(response.status)) throw new Error(response.statusText)

  return await response.json()
}
