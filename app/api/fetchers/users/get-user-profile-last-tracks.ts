import { fetchApi } from '../fetch-api'

import { SpotifyResponseWithCursors, Track } from '@app/api/types'

export function getUserProfileLastTracks(
  token?: string,
  userId?: string,
  limit = 10,
  before?: string | null,
  after?: string | null
) {
  const urlSearchParameters = new URLSearchParams({
    limit: limit + '',
  })

  if (after) urlSearchParameters.append('after', after)
  if (before) urlSearchParameters.append('before', before)

  return fetchApi<SpotifyResponseWithCursors<Track>>(
    `/users/${userId}/profile/last-tracks?${urlSearchParameters.toString()}`,
    { token, cache: 'no-cache' }
  )
}
