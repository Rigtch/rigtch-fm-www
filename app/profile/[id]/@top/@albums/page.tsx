import { redirect } from 'next/navigation'

import { getUser } from '@app/api/fetchers'
import { getRigtchTopAlbums } from '@app/api/fetchers/stats/rigtch'
import { getServerToken } from '@app/auth'
import { SeeMoreButton } from '@app/components/common/buttons'
import {
  STATS_MEASUREMENT,
  STATS_PROVIDER,
  TIME_RANGE,
  VIEW,
} from '@app/profile/constants'
import { StatsProvider, type RigtchTimeRange } from '@app/profile/enums'
import { ItemsSection } from '@app/profile/sections'
import type { ProfilePageProps } from '@app/profile/types'
import { afterParamFactory } from '@app/profile/utils/factories'
import {
  validateStatsMeasurement,
  validateStatsProvider,
  validateTimeRange,
  validateView,
} from '@app/profile/utils/validators'
import { validateId } from '@app/utils/validators'

export const runtime = 'edge'

export default async function ProfileTopAlbumsSubPage({
  searchParams,
  params,
}: ProfilePageProps) {
  const token = await getServerToken()
  const userId = validateId(params.id)

  if (!token) redirect('/')

  const { createdAt } = await getUser(token, {
    userId,
  })

  const statsProvider = validateStatsProvider(
    searchParams[STATS_PROVIDER],
    createdAt
  )
  const statsMeasurement = validateStatsMeasurement(
    searchParams[STATS_MEASUREMENT]
  )
  const timeRange = validateTimeRange(
    searchParams[TIME_RANGE],
    statsProvider,
    createdAt
  )
  const view = validateView(searchParams[VIEW])

  if (statsProvider === StatsProvider.SPOTIFY) return null

  const items = await getRigtchTopAlbums(token, {
    after: afterParamFactory(timeRange as RigtchTimeRange),
    userId,
    limit: 10,
    measurement: statsMeasurement,
  })

  return (
    <ItemsSection items={items} title="Top Albums" view={view}>
      <SeeMoreButton href={`/profile/${userId}/top/albums`} />
    </ItemsSection>
  )
}
