import { fetchApi } from '../fetch-api'

export function getUserProfileAnalysis(token?: string, userId?: string) {
  return fetchApi<{ genres: string[] }>(`/users/${userId}/profile/analysis`, {
    token,
  })
}
