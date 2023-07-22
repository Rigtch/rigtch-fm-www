import { SecretData } from '../types'

import { environment } from '~/config'

export function getRefresh(token?: string) {
  return fetch(`${environment.API_URL}/auth/refresh`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then<SecretData>(response => response.json())
}
