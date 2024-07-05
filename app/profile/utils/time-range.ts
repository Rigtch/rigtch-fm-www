import type { StatsProvider } from '../types'

import { RigtchTimeRange, SpotifyTimeRange } from '@app/api/types'

export function isSpotifyTimeRange(value: string): value is SpotifyTimeRange {
  return Object.values(SpotifyTimeRange).includes(value as SpotifyTimeRange)
}

export function isRigtchTimeRange(value: string): value is RigtchTimeRange {
  return Object.values(RigtchTimeRange).includes(value as RigtchTimeRange)
}

export function validateTimeRange(
  timeRange?: string | string[] | null,
  provider: StatsProvider = 'spotify'
) {
  if (
    provider === 'spotify' &&
    typeof timeRange === 'string' &&
    isSpotifyTimeRange(timeRange)
  )
    return timeRange

  if (typeof timeRange === 'string' && isRigtchTimeRange(timeRange))
    return timeRange

  return provider === 'spotify'
    ? SpotifyTimeRange.SHORT_TERM
    : RigtchTimeRange.WEEK
}
