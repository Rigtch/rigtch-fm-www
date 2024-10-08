import type { UserFollowing, UsersParams } from '../types'

import { fetchApi } from './fetch-api'

export function getUserFollowing(token: string, { userId }: UsersParams) {
  return fetchApi<UserFollowing>(`/users/${userId}/following`, {
    token,
    next: {
      tags: ['user'],
    },
  })
}
