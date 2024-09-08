import { StatsMeasurement } from '@app/api/enums'
import { fetchApi } from '@app/api/fetchers'
import {
  type ArtistEntity,
  type RigtchStatsParams,
  type RigtchStatsResponse,
} from '@app/api/types'

export function getRigtchTopArtists(
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

  return fetchApi<RigtchStatsResponse<ArtistEntity>>(
    `/users/${userId}/stats/rigtch/top-artists?${params.toString()}`,
    {
      token,
    }
  )
}
