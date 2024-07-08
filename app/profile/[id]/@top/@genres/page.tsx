'use server'

import { redirect } from 'next/navigation'

import { validateId } from '@app/utils/validate-id'
import { StatsProvider, type ProfilePageProps } from '@app/profile/types'
import {
  ID,
  STATS_MEASUREMENT,
  STATS_PROVIDER,
  TIME_RANGE,
} from '@app/constants'
import { validateTimeRange } from '@app/profile/utils/time-range'
import { SeeMoreButton } from '@app/components/common/buttons'
import { getTopGenres } from '@app/api/fetchers'
import { getServerToken } from '@app/auth/utils'
import { TopGenresSection } from '@app/profile/sections'
import { getRigtchTopGenres } from '@app/api/fetchers/stats/rigtch'
import type {
  RigtchStatsResponse,
  RigtchTimeRange,
  SpotifyTimeRange,
} from '@app/api/types'
import { getAfterParam } from '@app/profile/utils/get-after-param'
import { validateStatsProvider } from '@app/profile/utils/stats-provider'
import { validateStatsMeasurement } from '@app/profile/utils/stats-measurement'

export default async function ProfileTopGenresSubPage({
  searchParams,
  params,
}: ProfilePageProps) {
  const userId = validateId(params[ID])
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
      after: getAfterParam(timeRange as RigtchTimeRange),
      userId,
      limit: 10,
      measurement: statsMeasurement,
    })
  } else {
    const { genres } = await getTopGenres(token, {
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
