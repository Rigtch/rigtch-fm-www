import type { UsersParams } from '../types'

import { fetchApi } from './fetch-api'

type PutUnFollowUserParams = UsersParams & {
  followerId: string
}

export function putUnFollowUser(
  token: string,
  { userId, followerId }: PutUnFollowUserParams
) {
  return fetchApi<true>(`/users/${userId}/unfollow`, {
    method: 'PUT',
    token,
    body: {
      followerId,
    },
  })
}
