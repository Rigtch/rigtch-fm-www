import { fetchApi } from '../../fetch-api'

import {
  StatsMeasurement,
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
    measurement,
  })

  if (before) params.append('before', before.toISOString())
  if (limit) params.append('limit', limit + '')

  return fetchApi<RigtchStatsResponse<ArtistEntity>>(
    `/users/${userId}/stats/rigtch/top-artists?${params.toString()}`,
    {
      token,
    }
  )
}
