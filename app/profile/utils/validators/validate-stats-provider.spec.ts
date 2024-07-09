import { validateStatsProvider } from './validate-stats-provider'

import { StatsProvider } from '@app/profile/types'

describe('validateStatsProvider', () => {
  const statsProvider: StatsProvider = StatsProvider.SPOTIFY
  const invalid = 'invalid'

  test('should return statsProvider when statsProvider is a StatsProvider', () => {
    expect(validateStatsProvider(statsProvider)).toEqual(statsProvider)
  })

  test('should return StatsProvider.SPOTIFY when statsProvider is not a StatsProvider', () => {
    expect(validateStatsProvider(invalid)).toEqual(StatsProvider.SPOTIFY)
  })
})
