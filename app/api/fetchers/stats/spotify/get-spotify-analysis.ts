import type { Analysis, UsersParams } from '@app/api/types'
import { fetchApi } from '@app/api/fetchers'

export function getSpotifyAnalysis(token: string, { userId }: UsersParams) {
  return fetchApi<Analysis>(`/users/${userId}/profile/analysis`, { token })
}
