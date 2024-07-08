import { redirect } from 'next/navigation'

import { validateId } from '@app/utils/validate-id'
import { getTopTracks } from '@app/api/fetchers'
import { ItemsSection } from '@app/profile/sections'
import { validateTimeRange } from '@app/profile/utils/time-range'
import { validateView } from '@app/profile/utils/view'
import {
  STATS_MEASUREMENT,
  STATS_PROVIDER,
  TIME_RANGE,
  VIEW,
} from '@app/constants'
import { SeeMoreButton } from '@app/components/common/buttons'
import { StatsProvider, type ProfilePageProps } from '@app/profile/types'
import { getServerToken } from '@app/auth/utils'
import { validateStatsProvider } from '@app/profile/utils/stats-provider'
import type {
  RigtchStatsResponse,
  SpotifyTimeRange,
  TrackEntity,
  RigtchTimeRange,
} from '@app/api/types'
import { getRigtchTopTracks } from '@app/api/fetchers/stats/rigtch'
import { getAfterParam } from '@app/profile/utils/get-after-param'
import { validateStatsMeasurement } from '@app/profile/utils/stats-measurement'

export default async function ProfileTopTracksSubPage({
  searchParams,
  params,
}: ProfilePageProps) {
  const userId = validateId(params.id)
  const statsProvider = validateStatsProvider(searchParams[STATS_PROVIDER])
  const timeRange = validateTimeRange(searchParams[TIME_RANGE], statsProvider)
  const statsMeasurement = validateStatsMeasurement(
    searchParams[STATS_MEASUREMENT]
  )
  const view = validateView(searchParams[VIEW])

  const token = await getServerToken()

  if (!token) redirect('/')

  let items: TrackEntity[] | RigtchStatsResponse<TrackEntity>

  if (statsProvider === StatsProvider.RIGTCH) {
    items = await getRigtchTopTracks(token, {
      after: getAfterParam(timeRange as RigtchTimeRange),
      userId,
      limit: 10,
      measurement: statsMeasurement,
    })
  } else {
    const response = await getTopTracks(token, {
      timeRange: timeRange as SpotifyTimeRange,
      userId,
      limit: 10,
    })

    items = response.items
  }

  return (
    <ItemsSection items={items} title="Top Tracks" view={view}>
      <SeeMoreButton href={`/profile/${userId}/top/tracks`} />
    </ItemsSection>
  )
}
