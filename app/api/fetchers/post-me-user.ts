import { HttpMethod, User } from '../types'

import { fetchApi } from './fetch-api'

export function postMeUser(refreshToken: string) {
  return fetchApi<User>('/users/me', {
    body: {
      refreshToken,
    },
    method: HttpMethod.POST,
  })
}
