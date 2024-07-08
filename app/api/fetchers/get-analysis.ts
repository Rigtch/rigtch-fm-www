import type { Analysis, UsersParams } from '../types'

import { fetchApi } from './fetch-api'

export function getAnalysis(token: string, { userId }: UsersParams) {
  return fetchApi<Analysis>(`/users/${userId}/profile/analysis`, { token })
}
