import { Profile } from '../types'

import { fetchApi } from './fetch-api'

export function getProfile(token?: string) {
  return fetchApi<Profile>('/auth/profile', {
    token,
  })
}
