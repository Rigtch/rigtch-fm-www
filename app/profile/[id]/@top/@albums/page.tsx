import { redirect } from 'next/navigation'

import { getServerToken } from '@app/auth'
import {
  STATS_PROVIDER,
  TIME_RANGE,
  VIEW,
  STATS_MEASUREMENT,
} from '@app/profile/constants'
import type { ProfilePageProps } from '@app/profile/types'
import { validateId } from '@app/utils/validators'
import { getRigtchTopAlbums } from '@app/api/fetchers/stats/rigtch'
import { SeeMoreButton } from '@app/components/common/buttons'
import { ItemsSection } from '@app/profile/sections'
import {
  validateStatsMeasurement,
  validateStatsProvider,
  validateTimeRange,
  validateView,
} from '@app/profile/utils/validators'
import { afterParamFactory } from '@app/profile/utils/factories'
import { StatsProvider, type RigtchTimeRange } from '@app/profile/enums'

export default async function ProfileTopAlbumsSubPage({
  searchParams,
  params,
}: ProfilePageProps) {
  const userId = validateId(params.id)
  const statsProvider = validateStatsProvider(searchParams[STATS_PROVIDER])
  const statsMeasurement = validateStatsMeasurement(
    searchParams[STATS_MEASUREMENT]
  )
  const timeRange = validateTimeRange(searchParams[TIME_RANGE], statsProvider)
  const view = validateView(searchParams[VIEW])

  const token = await getServerToken()

  if (!token) redirect('/')

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
