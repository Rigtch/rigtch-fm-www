import type { SpotifyResponseWithCursors, Track, UsersParams } from '../types'

import { fetchApi } from './fetch-api'

export interface GetRecentlyPlayedParams extends UsersParams {
  limit?: number
  before?: string | null
  after?: string | null
}

export function getRecentlyPlayed(
  token: string,
  { limit = 10, before, after, userId }: GetRecentlyPlayedParams
) {
  const searchParams = new URLSearchParams({
    limit: limit + '',
  })

  if (after) searchParams.append('after', after)
  if (before) searchParams.append('before', before)

  return fetchApi<SpotifyResponseWithCursors<Track>>(
    `/users/${userId}/profile/recently-played?${searchParams.toString()}`,
    { token, cache: 'no-cache' }
  )
}
