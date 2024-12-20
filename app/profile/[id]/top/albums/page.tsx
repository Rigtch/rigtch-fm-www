import { getUser } from '@app/api/fetchers'
import { getReportsTotalAlbums } from '@app/api/fetchers/reports'
import { getRigtchTopAlbums } from '@app/api/fetchers/stats/rigtch'
import { getServerToken } from '@app/auth'
import { STATS_MEASUREMENT, TIME_RANGE, VIEW } from '@app/profile/constants'
import { StatsProvider, type RigtchTimeRange } from '@app/profile/enums'
import { ItemsSection } from '@app/profile/sections'
import type { ProfilePageProps } from '@app/profile/types'
import { afterParamFactory } from '@app/profile/utils/factories'
import {
  validateStatsMeasurement,
  validateTimeRange,
  validateView,
} from '@app/profile/utils/validators'
import { validateId } from '@app/utils/validators'

export default async function ProfileTopAlbumsPage({
  searchParams,
  params,
}: ProfilePageProps) {
  const userId = validateId(params.id)
  const token = await getServerToken(userId)

  const { createdAt } = await getUser(token, {
    userId,
  })

  const statsMeasurement = validateStatsMeasurement(
    searchParams[STATS_MEASUREMENT]
  )
  const timeRange = validateTimeRange(
    searchParams[TIME_RANGE],
    StatsProvider.RIGTCH,
    createdAt
  )
  const view = validateView(searchParams[VIEW])
  const after = afterParamFactory(timeRange as RigtchTimeRange)

  const [items, { total }] = await Promise.all([
    getRigtchTopAlbums(token, {
      after: afterParamFactory(timeRange as RigtchTimeRange),
      userId,
      limit: 100,
      measurement: statsMeasurement,
    }),
    getReportsTotalAlbums(token, {
      userId,
      after,
    }),
  ])

  return (
    <ItemsSection items={items} title="Top Albums" view={view} total={total} />
  )
}
