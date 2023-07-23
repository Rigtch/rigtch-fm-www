import { SecretData } from '../types'

import { environment } from '@config'

export async function getRefresh(token?: string): Promise<SecretData> {
  const response = await fetch(`${environment.API_URL}/auth/refresh`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (response.status === 401) throw new Error(response.statusText)

  return await response.json()
}
