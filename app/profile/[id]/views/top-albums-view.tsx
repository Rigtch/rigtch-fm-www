import type { ProfileOverviewViewProps } from './types/props'

import { getRigtchTopAlbums } from '@app/api/fetchers/stats/rigtch'
import { SeeMoreButton } from '@app/components/common/buttons'
import { StatsProvider, type RigtchTimeRange } from '@app/profile/enums'
import { ItemsSection } from '@app/profile/sections'
import { afterParamFactory } from '@app/profile/utils/factories'

export async function TopAlbumsView({
  token,
  userId,
  measurement,
  statsProvider,
  timeRange,
  view,
}: ProfileOverviewViewProps) {
  if (statsProvider === StatsProvider.SPOTIFY) return null

  const items = await getRigtchTopAlbums(token, {
    after: afterParamFactory(timeRange as RigtchTimeRange),
    userId,
    limit: 10,
    measurement,
  })

  return (
    <ItemsSection items={items} title="Top Albums" view={view}>
      <SeeMoreButton href={`/profile/${userId}/top/albums`} />
    </ItemsSection>
  )
}
