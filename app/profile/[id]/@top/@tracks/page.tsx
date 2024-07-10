import { redirect } from 'next/navigation'

import {
  STATS_MEASUREMENT,
  STATS_PROVIDER,
  TIME_RANGE,
  VIEW,
} from '@app/profile/constants'
import { validateId } from '@app/utils/validators'
import { ItemsSection } from '@app/profile/sections'
import { SeeMoreButton } from '@app/components/common/buttons'
import type { ProfilePageProps } from '@app/profile/types'
import { getServerToken } from '@app/auth/utils'
import type { RigtchStatsResponse, TrackEntity } from '@app/api/types'
import { getRigtchTopTracks } from '@app/api/fetchers/stats/rigtch'
import { getSpotifyTopTracks } from '@app/api/fetchers/stats/spotify'
import {
  validateStatsProvider,
  validateTimeRange,
  validateStatsMeasurement,
  validateView,
} from '@app/profile/utils/validators'
import { afterParamFactory } from '@app/profile/utils/factories'
import {
  StatsProvider,
  type RigtchTimeRange,
  type SpotifyTimeRange,
} from '@app/profile/enums'

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
      after: afterParamFactory(timeRange as RigtchTimeRange),
      userId,
      limit: 10,
      measurement: statsMeasurement,
    })
  } else {
    const response = await getSpotifyTopTracks(token, {
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
