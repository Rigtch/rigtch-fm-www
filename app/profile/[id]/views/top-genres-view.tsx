import type { ProfileOverviewViewProps } from './types/props'

import {
  StatsProvider,
  type RigtchTimeRange,
  type SpotifyTimeRange,
} from '@app/profile/enums'
import { TopGenresSection } from '@app/profile/sections'
import { afterParamFactory } from '@app/profile/utils/factories'
import { getReportsTotalGenres } from '@app/api/fetchers/reports'
import { getRigtchTopGenres } from '@app/api/fetchers/stats/rigtch'
import { getSpotifyTopGenres } from '@app/api/fetchers/stats/spotify'
import type { RigtchStatsResponse } from '@app/api/types'
import { SeeMoreButton } from '@app/components/common/buttons'

export async function TopGenresView({
  token,
  userId,
  measurement,
  statsProvider,
  timeRange,
}: Readonly<Omit<ProfileOverviewViewProps, 'view'>>) {
  const limit = 20

  let items: string[] | RigtchStatsResponse<string>
  let total: number | undefined = undefined

  if (statsProvider === StatsProvider.RIGTCH) {
    const after = afterParamFactory(timeRange as RigtchTimeRange)

    const [response, totalResponse] = await Promise.all([
      getRigtchTopGenres(token, {
        after,
        userId,
        limit,
        measurement,
      }),
      getReportsTotalGenres(token, {
        userId,
        after,
      }),
    ])

    items = response
    total = totalResponse.total
  } else {
    const { genres } = await getSpotifyTopGenres(token, {
      timeRange: timeRange as SpotifyTimeRange,
      userId,
      limit,
    })

    items = genres
  }

  return (
    <TopGenresSection items={items} total={total}>
      <SeeMoreButton href={`/profile/${userId}/top/genres`} />
    </TopGenresSection>
  )
}
