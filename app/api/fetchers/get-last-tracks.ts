import { SpotifyResponseWithCursors, Track } from '../types'

import { fetchApi } from './fetch-api'

export function getLastTracks(
  token?: string,
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
    `/statistics/last-tracks?${urlSearchParameters.toString()}`,
    { token, cache: 'no-cache' }
  )
}
