import type { ProfileOverviewViewProps } from './types/props'

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

  if (statsProvider === StatsProvider.RIGTCH) {
    items = await getRigtchTopArtists(token, {
      after: afterParamFactory(timeRange as RigtchTimeRange),
      userId,
      limit: 10,
      measurement,
    })
  } else {
    const response = await getSpotifyTopArtists(token, {
      timeRange: timeRange as SpotifyTimeRange,
      userId,
      limit: 10,
    })

    items = response.items
  }

  return (
    <ItemsSection items={items} title="Top Artists" view={view}>
      <SeeMoreButton href={`/profile/${userId}/top/artists`} />
    </ItemsSection>
  )
}
