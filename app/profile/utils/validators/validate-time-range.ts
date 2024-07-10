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
  provider: StatsProvider
) {
  if (typeof timeRange === 'string') {
    if (provider === StatsProvider.SPOTIFY && isSpotifyTimeRange(timeRange))
      return timeRange

    if (provider === StatsProvider.RIGTCH && isRigtchTimeRange(timeRange))
      return timeRange
  }

  return provider === StatsProvider.SPOTIFY
    ? SpotifyTimeRange.SHORT_TERM
    : RigtchTimeRange.WEEK
}