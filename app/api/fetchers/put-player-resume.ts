import { HttpMethod, Success } from '../types'

import { fetchApi } from './fetch-api'

export async function putPlayerResume(token?: string): Promise<Success> {
  return fetchApi<Success>('/player/resume', { token, method: HttpMethod.PUT })
}
