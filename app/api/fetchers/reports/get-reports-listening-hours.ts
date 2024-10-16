import { fetchApi } from '../fetch-api'

import { StatsMeasurement } from '@app/api/enums'
import { baseBeforeParamFactory } from '@app/api/helpers'
import type { ReportsListeningParams } from '@app/api/types'

export function getReportsListeningHours(
  token: string,
  {
    userId,
    before = new Date(),
    after,
    measurement = StatsMeasurement.PLAYS,
  }: ReportsListeningParams
) {
  const params = new URLSearchParams({
    after: after.toISOString(),
    before: before?.toISOString() ?? baseBeforeParamFactory(new Date()),
    measurement,
  })

  if (before) params.append('before', before.toISOString())

  return fetchApi<Record<number, number>>(
    `/users/${userId}/reports/listening-hours?${params.toString()}`,
    {
      token,
    }
  )
}
