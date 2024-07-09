import {
  SpotifyTimeRange,
  type ArtistEntity,
  type GetTopItemsParams,
  type SpotifyResponseWithOffset,
} from '@app/api/types'
import { fetchApi } from '@app/api/fetchers'

export function getSpotifyTopArtists(
  token: string,
  {
    userId,
    timeRange = SpotifyTimeRange.LONG_TERM,
    limit = 10,
    offset = 0,
  }: GetTopItemsParams
) {
  const params = new URLSearchParams({
    timeRange,
    limit: limit + '',
    offset: offset + '',
  })

  return fetchApi<SpotifyResponseWithOffset<ArtistEntity>>(
    `/users/${userId}/stats/spotify/top-artists?${params.toString()}`,
    { token }
  )
}
