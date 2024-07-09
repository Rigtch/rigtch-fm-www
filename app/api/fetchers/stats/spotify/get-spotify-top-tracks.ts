import { fetchApi } from '@app/api/fetchers'
import {
  SpotifyTimeRange,
  type GetTopItemsParams,
  type SpotifyResponseWithOffset,
  type TrackEntity,
} from '@app/api/types'

export function getSpotifyTopTracks(
  token: string,
  {
    userId,
    timeRange = SpotifyTimeRange.LONG_TERM,
    limit = 10,
    offset = 0,
  }: GetTopItemsParams
) {
  const searchParams = new URLSearchParams({
    timeRange,
    limit: limit + '',
    offset: offset + '',
  })

  return fetchApi<SpotifyResponseWithOffset<TrackEntity>>(
    `/users/${userId}/stats/spotify/top-tracks?${searchParams.toString()}`,
    { token }
  )
}
