import { fetchApi } from '../fetch-api'

import { StatsMeasurement } from '@app/api/enums'
import type {
  GenresListeningDays,
  ReportsListeningParams,
} from '@app/api/types'

export function getReportsGenresListeningDays(
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

  return fetchApi<GenresListeningDays>(
    `/users/${userId}/reports/genres-listening-days?${params.toString()}`,
    {
      token,
    }
  ).then(response =>
    response.map(day => ({
      ...day,
      date: new Date(day.date),
    }))
  )
}
