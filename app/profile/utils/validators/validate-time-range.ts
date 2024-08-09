import { isTimeRangeDisabled } from '../helpers'

import {
  DEFAULT_RIGTCH_TIME_RANCE,
  DEFAULT_SPOTIFY_TIME_RANCE,
} from '@app/profile/constants'
import {
  RigtchTimeRange,
  SpotifyTimeRange,
  StatsProvider,
} from '@app/profile/enums'

function isSpotifyTimeRange(value: string): value is SpotifyTimeRange {
  return Object.values(SpotifyTimeRange).includes(value as SpotifyTimeRange)
}

function isRigtchTimeRange(value: string): value is RigtchTimeRange {
  return Object.values(RigtchTimeRange).includes(value as RigtchTimeRange)
}

export function validateTimeRange(
  timeRange: string | string[] | null | undefined,
  provider: StatsProvider,
  userCreatedAt?: Date
) {
  if (typeof timeRange === 'string') {
    if (provider === StatsProvider.SPOTIFY && isSpotifyTimeRange(timeRange))
      return timeRange

    if (provider === StatsProvider.RIGTCH && isRigtchTimeRange(timeRange))
      return timeRange
  }

  return provider === StatsProvider.SPOTIFY
    ? DEFAULT_SPOTIFY_TIME_RANCE
    : isTimeRangeDisabled(DEFAULT_RIGTCH_TIME_RANCE, userCreatedAt)
      ? RigtchTimeRange.WEEK
      : DEFAULT_RIGTCH_TIME_RANCE
}
