import type { User, UsersParams } from '../types'

import { fetchApi } from './fetch-api'

export function getUser(token: string, { userId }: UsersParams) {
  return fetchApi<User>(`/users/${userId}`, {
    token,
  }).then(user => ({
    ...user,
    createdAt: new Date(user.createdAt),
  }))
}
