import { HttpMethod, RefreshToken, SecretData } from '../types'

import { fetchApi } from './fetch-api'

export function getRefresh(token: string) {
  return fetchApi<SecretData, RefreshToken>('/auth/refresh', {
    body: {
      refreshToken: token,
    },
    method: HttpMethod.POST,
    cache: 'no-cache',
  })
}
