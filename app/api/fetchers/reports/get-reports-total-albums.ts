import { fetchApi } from '../fetch-api'

import type { ReportsTotalItemsParams, TotalItems } from '@app/api/types'

export function getReportsTotalAlbums(
  token: string,
  { userId, before, after }: ReportsTotalItemsParams
) {
  const params = new URLSearchParams({
    after: after.toISOString(),
  })

  if (before) params.append('before', before.toISOString())

  return fetchApi<TotalItems>(
    `/users/${userId}/reports/total-albums?${params.toString()}`,
    {
      token,
    }
  )
}
