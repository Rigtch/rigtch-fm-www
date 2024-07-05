import { fetchApi } from '../../fetch-api'

import {
  StatsMeasurement,
  type RigtchStatsParams,
  type RigtchStatsResponse,
  type TrackEntity,
} from '@app/api/types'

export function getRigtchTopTracks(
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

  return fetchApi<RigtchStatsResponse<TrackEntity, typeof measurement>>(
    `/users/${userId}/stats/rigtch/top-tracks?${params.toString()}`,
    {
      token,
    }
  )
}
