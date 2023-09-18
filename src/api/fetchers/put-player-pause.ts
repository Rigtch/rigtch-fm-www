import { HttpMethod, Success } from '../types'

import { fetchApi } from './fetch-api'

export async function putPlayerPause(token?: string) {
  return fetchApi<Success>('/player/pause', { token, method: HttpMethod.PUT })
}
