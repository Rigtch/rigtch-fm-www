import {
  GetTopItemsParams,
  SpotifyResponseWithOffset,
  TimeRange,
  TrackEntity,
} from '../types'

import { fetchApi } from './fetch-api'

export function getTopTracks(
  token: string,
  {
    userId,
    timeRange = TimeRange.LONG_TERM,
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
    `/users/${userId}/profile/top/tracks?${searchParams.toString()}`,
    { token }
  )
}
