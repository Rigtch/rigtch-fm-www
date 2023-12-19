import { fetchApi } from '../fetch-api'

import { User } from '@app/api/types'

export function getUser(token?: string, userId?: string) {
  return fetchApi<User>('/users/' + userId, {
    token,
  })
}
