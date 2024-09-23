import {
  StatsProvider,
  type RigtchTimeRange,
  type SpotifyTimeRange,
} from '../../enums'
import { TopGenresSection } from '../../sections'
import { afterParamFactory } from '../../utils/factories'

import type { ProfileOverviewViewProps } from './types/props'

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

  if (statsProvider === StatsProvider.RIGTCH) {
    items = await getRigtchTopGenres(token, {
      after: afterParamFactory(timeRange as RigtchTimeRange),
      userId,
      limit,
      measurement,
    })
  } else {
    const { genres } = await getSpotifyTopGenres(token, {
      timeRange: timeRange as SpotifyTimeRange,
      userId,
      limit,
    })

    items = genres
  }

  return (
    <TopGenresSection items={items}>
      <SeeMoreButton href={`/profile/${userId}/top/genres`} />
    </TopGenresSection>
  )
}
