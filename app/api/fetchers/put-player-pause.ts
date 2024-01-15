import { HttpMethod, Success, UsersParams } from '../types'

import { fetchApi } from './fetch-api'

export function putPlayerPause(token: string, { userId }: UsersParams) {
  return fetchApi<Success>(`/users/${userId}/playback/pause`, {
    token,
    method: HttpMethod.PUT,
  })
}
