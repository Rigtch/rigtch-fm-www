'use server'

import { redirect } from 'next/navigation'

import { validateId } from '@app/utils/validators'
import type { ProfilePageProps } from '@app/profile/types'
import {
  STATS_MEASUREMENT,
  STATS_PROVIDER,
  TIME_RANGE,
} from '@app/profile/constants'
import { SeeMoreButton } from '@app/components/common/buttons'
import { getServerToken } from '@app/auth/utils'
import { TopGenresSection } from '@app/profile/sections'
import { getRigtchTopGenres } from '@app/api/fetchers/stats/rigtch'
import { getSpotifyTopGenres } from '@app/api/fetchers/stats/spotify'
import type { RigtchStatsResponse } from '@app/api/types'
import {
  validateStatsProvider,
  validateStatsMeasurement,
  validateTimeRange,
} from '@app/profile/utils/validators'
import { afterParamFactory } from '@app/profile/utils/factories'
import {
  StatsProvider,
  type RigtchTimeRange,
  type SpotifyTimeRange,
} from '@app/profile/enums'

export default async function ProfileTopGenresSubPage({
  searchParams,
  params,
}: ProfilePageProps) {
  const userId = validateId(params.id)
  const statsProvider = validateStatsProvider(searchParams[STATS_PROVIDER])
  const statsMeasurement = validateStatsMeasurement(
    searchParams[STATS_MEASUREMENT]
  )
  const timeRange = validateTimeRange(searchParams[TIME_RANGE], statsProvider)

  const token = await getServerToken()

  if (!token) redirect('/')

  let items: string[] | RigtchStatsResponse<string>

  if (statsProvider === StatsProvider.RIGTCH) {
    items = await getRigtchTopGenres(token, {
      after: afterParamFactory(timeRange as RigtchTimeRange),
      userId,
      limit: 10,
      measurement: statsMeasurement,
    })
  } else {
    const { genres } = await getSpotifyTopGenres(token, {
      timeRange: timeRange as SpotifyTimeRange,
      userId,
      limit: 10,
    })

    items = genres
  }

  return (
    <TopGenresSection items={items}>
      <SeeMoreButton href={`/profile/${userId}/top/genres`} />
    </TopGenresSection>
  )
}
