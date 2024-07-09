import { redirect } from 'next/navigation'

import { validateId } from '@app/utils/validators'
import {
  STATS_MEASUREMENT,
  STATS_PROVIDER,
  TIME_RANGE,
} from '@app/profile/constants'
import { getTopGenres } from '@app/api/fetchers'
import { StatsProvider, type ProfilePageProps } from '@app/profile/types'
import { getServerToken } from '@app/auth/utils'
import { TopGenresSection } from '@app/profile/sections'
import type {
  RigtchStatsResponse,
  RigtchTimeRange,
  SpotifyTimeRange,
} from '@app/api/types'
import { getRigtchTopGenres } from '@app/api/fetchers/stats/rigtch'
import {
  validateStatsProvider,
  validateStatsMeasurement,
  validateTimeRange,
} from '@app/profile/utils/validators'
import { afterParamFactory } from '@app/profile/utils/factories'

export const runtime = 'edge'

export default async function ProfileTopGenresPage({
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
      limit: 100,
      after: afterParamFactory(timeRange as RigtchTimeRange),
      userId,
      measurement: statsMeasurement,
    })
  } else {
    const { genres } = await getTopGenres(token, {
      limit: 50,
      timeRange: timeRange as SpotifyTimeRange,
      userId,
    })

    items = genres
  }

  return <TopGenresSection items={items} />
}
