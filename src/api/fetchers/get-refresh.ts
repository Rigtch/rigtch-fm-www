import { SecretData } from '../types'

import { fetchApi } from './fetch-api'

export async function getRefresh(token?: string) {
  return fetchApi<SecretData>('/auth/refresh', { token })
}
