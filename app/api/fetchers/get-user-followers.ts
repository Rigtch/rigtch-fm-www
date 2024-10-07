import type { UserFollowers, UsersParams } from '../types'

import { fetchApi } from './fetch-api'

export function getUserFollowers(token: string, { userId }: UsersParams) {
  return fetchApi<UserFollowers>(`/users/${userId}/followers`, {
    token,
    next: {
      tags: ['user'],
    },
  })
}
