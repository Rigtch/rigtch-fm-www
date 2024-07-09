import { redirect } from 'next/navigation'

import { getServerToken } from '@app/auth'
import {
  STATS_PROVIDER,
  TIME_RANGE,
  VIEW,
  STATS_MEASUREMENT,
} from '@app/profile/constants'
import { StatsProvider, type ProfilePageProps } from '@app/profile/types'
import { validateStatsProvider } from '@app/profile/utils/stats-provider'
import { validateTimeRange } from '@app/profile/utils/time-range'
import { validateView } from '@app/profile/utils/view'
import { validateId } from '@app/utils/validate-id'
import { getRigtchTopAlbums } from '@app/api/fetchers/stats/rigtch'
import { getAfterParam } from '@app/profile/utils/get-after-param'
import type { RigtchTimeRange } from '@app/api/types'
import { SeeMoreButton } from '@app/components/common/buttons'
import { ItemsSection } from '@app/profile/sections'
import { validateStatsMeasurement } from '@app/profile/utils/stats-measurement'

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
    after: getAfterParam(timeRange as RigtchTimeRange),
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
