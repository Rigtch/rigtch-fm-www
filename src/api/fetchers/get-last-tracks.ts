import { SpotifyResponseWithCursors, Track } from '../types'

import { environment } from '@config/environment'

export async function getLastTracks(
  token?: string,
  limit = 10,
  before?: string,
  after?: string
): Promise<SpotifyResponseWithCursors<Track>> {
  const urlSearchParameters = new URLSearchParams({
    limit: limit + '',
  })

  if (after) urlSearchParameters.append('after', after)
  if (before) urlSearchParameters.append('before', before)

  const response = await fetch(
    `${
      environment.API_URL
    }/statistics/last-tracks?${urlSearchParameters.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  if ([401, 403].includes(response.status)) throw new Error(response.statusText)

  return await response.json()
}
