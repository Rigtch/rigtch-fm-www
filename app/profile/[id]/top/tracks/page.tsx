import { redirect } from 'next/navigation'

import { validateId } from '@app/utils/validate-id'
import { getTopTracks } from '@app/api/fetchers'
import { ItemsSection } from '@app/profile/sections'
import { validateTimeRange } from '@app/profile/utils/time-range'
import { validateView } from '@app/profile/utils/view'
import {
  ID,
  STATS_MEASUREMENT,
  STATS_PROVIDER,
  TIME_RANGE,
  VIEW,
} from '@app/constants'
import { StatsProvider, type ProfilePageProps } from '@app/profile/types'
import { getServerToken } from '@app/auth/utils'
import { validateStatsProvider } from '@app/profile/utils/stats-provider'
import { validateStatsMeasurement } from '@app/profile/utils/stats-measurement'
import type {
  RigtchStatsResponse,
  RigtchTimeRange,
  SpotifyTimeRange,
  TrackEntity,
} from '@app/api/types'
import { getRigtchTopTracks } from '@app/api/fetchers/stats/rigtch'
import { getAfterParam } from '@app/profile/utils/get-after-param'

export const runtime = 'edge'

export default async function ProfileTopTracksPage({
  searchParams,
  params,
}: ProfilePageProps) {
  const userId = validateId(params[ID])
  const statsProvider = validateStatsProvider(searchParams[STATS_PROVIDER])
  const statsMeasurement = validateStatsMeasurement(
    searchParams[STATS_MEASUREMENT]
  )
  const timeRange = validateTimeRange(searchParams[TIME_RANGE], statsProvider)
  const view = validateView(searchParams[VIEW])

  const token = await getServerToken()

  if (!token) redirect('/')

  let items: TrackEntity[] | RigtchStatsResponse<TrackEntity>

  if (statsProvider === StatsProvider.RIGTCH) {
    items = await getRigtchTopTracks(token, {
      after: getAfterParam(timeRange as RigtchTimeRange),
      userId,
      limit: 100,
      measurement: statsMeasurement,
    })
  } else {
    const { items: responseFirstPart } = await getTopTracks(token, {
      timeRange: timeRange as SpotifyTimeRange,
      userId,
      limit: 50,
      offset: 0,
    })
    const { items: responseSecondPart } = await getTopTracks(token, {
      timeRange: timeRange as SpotifyTimeRange,
      userId,
      limit: 50,
      offset: 49,
    })

    // Remove the first item of the second part to avoid duplicates
    responseFirstPart.shift()

    items = responseFirstPart.concat(responseSecondPart)
  }

  return <ItemsSection items={items} title="Top Tracks" view={view} />
}
