import type { User, UsersParams } from '../types'

import { fetchApi } from './fetch-api'

export function getUser(token: string, { userId }: UsersParams) {
  return fetchApi<User>(`/users/${userId}`, {
    token,
    next: {
      tags: ['user'],
    },
  }).then(({ createdAt, ...user }) => ({
    ...user,
    ...(createdAt && { createdAt: new Date(createdAt) }),
  }))
}
