import { fetchApi } from '@app/api/fetchers'
import { StatsMeasurement } from '@app/api/enums'
import {
  type AlbumEntity,
  type RigtchStatsParams,
  type RigtchStatsResponse,
} from '@app/api/types'

export function getRigtchTopAlbums(
  token: string,
  {
    userId,
    limit = 10,
    before,
    after,
    measurement = StatsMeasurement.PLAYS,
  }: RigtchStatsParams
) {
  const params = new URLSearchParams({
    after: after.toISOString(),
    limit: limit + '',
    measurement,
  })

  if (before) params.append('before', before.toISOString())

  return fetchApi<RigtchStatsResponse<AlbumEntity>>(
    `/users/${userId}/stats/rigtch/top-albums?${params.toString()}`,
    {
      token,
    }
  )
}
