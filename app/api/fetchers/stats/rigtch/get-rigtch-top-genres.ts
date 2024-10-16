import { fetchApi } from '@app/api/fetchers'
import { StatsMeasurement } from '@app/api/enums'
import {
  type RigtchStatsParams,
  type RigtchStatsResponse,
} from '@app/api/types'
import { baseBeforeParamFactory } from '@app/api/helpers'

export function getRigtchTopGenres(
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
    before: before?.toISOString() ?? baseBeforeParamFactory(new Date()),
    measurement,
  })

  return fetchApi<RigtchStatsResponse<string>>(
    `/users/${userId}/stats/rigtch/top-genres?${params.toString()}`,
    {
      token,
    }
  )
}
