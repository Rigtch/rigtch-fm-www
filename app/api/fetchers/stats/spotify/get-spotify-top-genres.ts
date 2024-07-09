import { SpotifyTimeRange, type GetTopItemsParams } from '@app/api/types'
import { fetchApi } from '@app/api/fetchers'

export function getSpotifyTopGenres(
  token: string,
  {
    userId,
    timeRange = SpotifyTimeRange.LONG_TERM,
    limit = 10,
  }: GetTopItemsParams
) {
  const searchParams = new URLSearchParams({
    timeRange,
    limit: limit + '',
  })

  return fetchApi<{ genres: string[] }>(
    `/users/${userId}/profile/top/genres?${searchParams.toString()}`,
    {
      token,
    }
  )
}
