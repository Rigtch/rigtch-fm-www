import { redirect } from 'next/navigation'

import { getUser } from '@app/api/fetchers'
import { getRigtchTopTracks } from '@app/api/fetchers/stats/rigtch'
import { getSpotifyTopTracks } from '@app/api/fetchers/stats/spotify'
import type { RigtchStatsResponse, TrackEntity } from '@app/api/types'
import { getServerToken } from '@app/auth/utils'
import { SeeMoreButton } from '@app/components/common/buttons'
import {
  STATS_MEASUREMENT,
  STATS_PROVIDER,
  TIME_RANGE,
  VIEW,
} from '@app/profile/constants'
import {
  StatsProvider,
  type RigtchTimeRange,
  type SpotifyTimeRange,
} from '@app/profile/enums'
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

export default async function ProfileTopTracksSubPage({
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
  const timeRange = validateTimeRange(searchParams[TIME_RANGE], statsProvider)
  const statsMeasurement = validateStatsMeasurement(
    searchParams[STATS_MEASUREMENT]
  )
  const view = validateView(searchParams[VIEW])

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
