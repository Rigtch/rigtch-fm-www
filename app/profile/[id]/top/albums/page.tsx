import { redirect } from 'next/navigation'

import { getRigtchTopAlbums } from '@app/api/fetchers/stats/rigtch'
import { getServerToken } from '@app/auth'
import { STATS_MEASUREMENT, TIME_RANGE, VIEW } from '@app/profile/constants'
import { ItemsSection } from '@app/profile/sections'
import type { ProfilePageProps } from '@app/profile/types'
import { validateId } from '@app/utils/validators'
import {
  validateStatsMeasurement,
  validateTimeRange,
  validateView,
} from '@app/profile/utils/validators'
import { afterParamFactory } from '@app/profile/utils/factories'
import { StatsProvider, type RigtchTimeRange } from '@app/profile/enums'
import { getUser } from '@app/api/fetchers'

export const runtime = 'edge'

export default async function ProfileTopAlbumsPage({
  searchParams,
  params,
}: ProfilePageProps) {
  const userId = validateId(params.id)
  const token = await getServerToken()

  if (!token) redirect('/')

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

  const items = await getRigtchTopAlbums(token, {
    after: afterParamFactory(timeRange as RigtchTimeRange),
    userId,
    limit: 100,
    measurement: statsMeasurement,
  })

  return <ItemsSection items={items} title="Top Albums" view={view} />
}
