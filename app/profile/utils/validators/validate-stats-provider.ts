import { StatsProvider } from '@app/profile/types'

function isStatsProvider(value: string): value is StatsProvider {
  return Object.values(StatsProvider).includes(value as StatsProvider)
}

export function validateStatsProvider(
  statsProvider?: string | string[] | null
) {
  if (typeof statsProvider === 'string' && isStatsProvider(statsProvider))
    return statsProvider

  return StatsProvider.SPOTIFY
}
