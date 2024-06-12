import {
  ArtistEntity,
  GetTopItemsParams,
  SpotifyResponseWithOffset,
  TimeRange,
} from '../types'

import { fetchApi } from './fetch-api'

export function getTopArtists(
  token: string,
  {
    userId,
    timeRange = TimeRange.LONG_TERM,
    limit = 10,
    offset = 0,
  }: GetTopItemsParams
) {
  const params = new URLSearchParams({
    timeRange,
    limit: limit + '',
    offset: offset + '',
  })

  const path = `/users/${userId}/profile/top/artists`

  return fetchApi<SpotifyResponseWithOffset<ArtistEntity>>(
    `${path}?${params.toString()}`,
    { token }
  )
}
