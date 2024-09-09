import { fetchApi } from '../fetch-api'

import { StatsMeasurement } from '@app/api/enums'
import type {
  ListeningDay,
  ListeningDays,
  ReportsListeningParams,
} from '@app/api/types'

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
    measurement,
  })

  if (before) params.append('before', before.toISOString())

  return fetchApi<ListeningDays>(
    `/users/${userId}/reports/listening-days?${params.toString()}`,
    {
      token,
    }
  ).then(response =>
    response.map<ListeningDay>(day => ({ ...day, date: new Date(day.date) }))
  )
}
