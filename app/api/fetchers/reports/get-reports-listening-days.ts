import { fetchApi } from '../fetch-api'

import { StatsMeasurement } from '@app/api/enums'
import { baseBeforeParamFactory } from '@app/api/helpers'
import type { ListeningDays, ReportsListeningParams } from '@app/api/types'

export function getReportsListeningDays(
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

  return fetchApi<ListeningDays>(
    `/users/${userId}/reports/listening-days?${params.toString()}`,
    {
      token,
    }
  ).then(response =>
    response.map(day => ({ ...day, date: new Date(day.date) }))
  )
}
