import type { ProfileOverviewViewProps } from './types/props'

import { getReportsTotalTracks } from '@app/api/fetchers/reports'
import { getRigtchTopTracks } from '@app/api/fetchers/stats/rigtch'
import { getSpotifyTopTracks } from '@app/api/fetchers/stats/spotify'
import type { TrackEntity, RigtchStatsResponse } from '@app/api/types'
import { SeeMoreButton } from '@app/components/common/buttons'
import {
  StatsProvider,
  type RigtchTimeRange,
  type SpotifyTimeRange,
} from '@app/profile/enums'
import { ItemsSection } from '@app/profile/sections'
import { afterParamFactory } from '@app/profile/utils/factories'

export async function TopTracksView({
  token,
  userId,
  measurement,
  statsProvider,
  timeRange,
  view,
}: ProfileOverviewViewProps) {
  let items: TrackEntity[] | RigtchStatsResponse<TrackEntity>
  let total: number | undefined = undefined

  if (statsProvider === StatsProvider.RIGTCH) {
    const after = afterParamFactory(timeRange as RigtchTimeRange)

    const [response, totalResponse] = await Promise.all([
      getRigtchTopTracks(token, {
        after,
        userId,
        limit: 10,
        measurement,
      }),
      getReportsTotalTracks(token, {
        userId,
        after,
      }),
    ])

    items = response
    total = totalResponse.total
  } else {
    const response = await getSpotifyTopTracks(token, {
      timeRange: timeRange as SpotifyTimeRange,
      userId,
      limit: 10,
    })

    items = response.items
  }

  return (
    <ItemsSection items={items} title="Top Tracks" view={view} total={total}>
      <SeeMoreButton href={`/profile/${userId}/top/tracks`} />
    </ItemsSection>
  )
}
