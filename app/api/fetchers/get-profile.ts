import { User } from '../types'

import { fetchApi } from './fetch-api'

export function getProfile(token?: string) {
  return fetchApi<User>('/auth/profile', {
    token,
  })
}
