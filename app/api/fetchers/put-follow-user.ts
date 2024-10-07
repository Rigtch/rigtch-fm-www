import type { UsersParams } from '../types'

import { fetchApi } from './fetch-api'

type PutFollowUserParams = UsersParams & {
  followerId: string
}

export function putFollowUser(
  token: string,
  { userId, followerId }: PutFollowUserParams
) {
  return fetchApi<true>(`/users/${userId}/follow`, {
    method: 'PUT',
    token,
    body: {
      followerId,
    },
  })
}
