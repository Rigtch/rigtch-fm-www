import type { ProfileOverviewViewProps } from './types/props'

import { getReportsTotalArtists } from '@app/api/fetchers/reports'
import { getRigtchTopArtists } from '@app/api/fetchers/stats/rigtch'
import { getSpotifyTopArtists } from '@app/api/fetchers/stats/spotify'
import type { ArtistEntity, RigtchStatsResponse } from '@app/api/types'
import { SeeMoreButton } from '@app/components/common/buttons'
import {
  StatsProvider,
  type RigtchTimeRange,
  type SpotifyTimeRange,
} from '@app/profile/enums'
import { ItemsSection } from '@app/profile/sections'
import { afterParamFactory } from '@app/profile/utils/factories'

export async function TopArtistsView({
  token,
  userId,
  measurement,
  statsProvider,
  timeRange,
  view,
}: ProfileOverviewViewProps) {
  let items: ArtistEntity[] | RigtchStatsResponse<ArtistEntity>
  let total: number | undefined = undefined

  if (statsProvider === StatsProvider.RIGTCH) {
    const after = afterParamFactory(timeRange as RigtchTimeRange)

    const [response, totalResponse] = await Promise.all([
      getRigtchTopArtists(token, {
        after,
        userId,
        limit: 10,
        measurement,
      }),
      getReportsTotalArtists(token, {
        userId,
        after,
      }),
    ])

    items = response
    total = totalResponse.total
  } else {
    const response = await getSpotifyTopArtists(token, {
      timeRange: timeRange as SpotifyTimeRange,
      userId,
      limit: 10,
    })

    items = response.items
  }

  return (
    <ItemsSection items={items} title="Top Artists" view={view} total={total}>
      <SeeMoreButton href={`/profile/${userId}/top/artists`} />
    </ItemsSection>
  )
}
