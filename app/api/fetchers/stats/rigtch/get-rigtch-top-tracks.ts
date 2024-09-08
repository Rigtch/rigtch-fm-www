import { fetchApi } from '@app/api/fetchers'
import { StatsMeasurement } from '@app/api/enums'
import {
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
    limit: limit + '',
    measurement,
  })

  if (before) params.append('before', before.toISOString())

  return fetchApi<RigtchStatsResponse<TrackEntity>>(
    `/users/${userId}/stats/rigtch/top-tracks?${params.toString()}`,
    {
      token,
    }
  )
}
