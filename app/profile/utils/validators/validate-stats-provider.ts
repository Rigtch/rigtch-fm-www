import { isTimeRangeDisabled } from '@app/profile/utils/helpers'
import { RigtchTimeRange, StatsProvider } from '@app/profile/enums'

function isStatsProvider(value: string): value is StatsProvider {
  return Object.values(StatsProvider).includes(value as StatsProvider)
}

export function validateStatsProvider(
  statsProvider?: string | string[] | null,
  userCreatedAt?: Date
) {
  if (typeof statsProvider === 'string' && isStatsProvider(statsProvider))
    return statsProvider

  return userCreatedAt &&
    isTimeRangeDisabled(RigtchTimeRange.WEEK, userCreatedAt)
    ? StatsProvider.SPOTIFY
    : StatsProvider.RIGTCH
}
