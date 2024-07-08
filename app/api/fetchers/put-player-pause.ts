import { HttpMethod, type Success, type UsersParams } from '../types'

import { fetchApi } from './fetch-api'

export function putPlayerPause(token: string, { userId }: UsersParams) {
  return fetchApi<Success>(`/users/${userId}/playback/pause`, {
    token,
    method: HttpMethod.PUT,
  })
}
