import { Profile } from '../types'

import { environment } from '@config'

export async function getProfile(token?: string): Promise<Profile> {
  const response = await fetch(`${environment.API_URL}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (response.status === 401) throw new Error(response.statusText)

  return await response.json()
}
