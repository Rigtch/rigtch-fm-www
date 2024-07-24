import { validateStatsProvider } from './validate-stats-provider'

import { StatsProvider } from '@app/profile/enums'

describe('validateStatsProvider', () => {
  const statsProvider: StatsProvider = StatsProvider.SPOTIFY
  const invalid = 'invalid'

  test('should return statsProvider when statsProvider is a StatsProvider', () => {
    expect(validateStatsProvider(statsProvider)).toEqual(statsProvider)
  })

  test('should return StatsProvider.SPOTIFY when statsProvider is not a StatsProvider and user created at is before BETA_USER_CREATED_AT', () => {
    expect(validateStatsProvider(invalid)).toEqual(StatsProvider.SPOTIFY)
  })

  test('should return StatsProvider.SPOTIFY when statsProvider is not a StatsProvider and user created at is after BETA_USER_CREATED_AT', () => {
    expect(
      validateStatsProvider(
        invalid,
        new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)
      )
    ).toEqual(StatsProvider.SPOTIFY)
  })
})
