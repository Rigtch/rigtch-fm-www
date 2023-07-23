import { Success } from '../types'

import { environment } from '@config/environment'

export async function putPlayerPause(token?: string): Promise<Success> {
  const response = await fetch(`${environment.API_URL}/player/pause`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if ([401, 403].includes(response.status)) throw new Error(response.statusText)

  return await response.json()
}
