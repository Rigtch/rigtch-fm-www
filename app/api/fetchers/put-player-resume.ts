import { HttpMethod, Success, UsersParams } from '../types'

import { fetchApi } from './fetch-api'

export async function putPlayerResume(
  token: string,
  { userId }: UsersParams
): Promise<Success> {
  return fetchApi<Success>(`/users/${userId}/playback/resume`, {
    token,
    method: HttpMethod.PUT,
  })
}
