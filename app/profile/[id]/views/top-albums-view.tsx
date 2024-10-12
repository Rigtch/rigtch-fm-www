import type { ProfileOverviewViewProps } from './types/props'

import { getReportsTotalAlbums } from '@app/api/fetchers/reports'
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

  const after = afterParamFactory(timeRange as RigtchTimeRange)

  const [items, { total }] = await Promise.all([
    getRigtchTopAlbums(token, {
      after,
      userId,
      limit: 10,
      measurement,
    }),
    getReportsTotalAlbums(token, {
      userId,
      after,
    }),
  ])

  return (
    <ItemsSection items={items} title="Top Albums" view={view} total={total}>
      <SeeMoreButton href={`/profile/${userId}/top/albums`} />
    </ItemsSection>
  )
}
