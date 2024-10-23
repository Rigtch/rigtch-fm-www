import { fetchApi } from '../fetch-api'

import { baseBeforeParamFactory } from '@app/api/helpers'
import type { ReportsTotalItemsParams, TotalItems } from '@app/api/types'

export function getReportsTotalPlays(
  token: string,
  { userId, before, after }: ReportsTotalItemsParams
) {
  const params = new URLSearchParams({
    after: after.toISOString(),
    before: before?.toISOString() ?? baseBeforeParamFactory(new Date()),
  })

  return fetchApi<TotalItems>(
    `/users/${userId}/reports/total-plays?${params.toString()}`,
    {
      token,
    }
  )
}
