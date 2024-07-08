import { StatsProvider } from '../types'

import { isStatsProvider, validateStatsProvider } from './stats-provider'

describe('StatsProvider', () => {
  const statsProvider: StatsProvider = StatsProvider.SPOTIFY
  const invalid = 'invalid'

  describe('isStatsProvider', () => {
    test('should return true when value is a StatsProvider', () => {
      expect(isStatsProvider(statsProvider)).toBeTruthy()
    })

    test('should return false when value is not a StatsProvider', () => {
      expect(isStatsProvider(invalid)).toBeFalsy()
    })
  })

  describe('validateStatsProvider', () => {
    test('should return statsProvider when statsProvider is a StatsProvider', () => {
      expect(validateStatsProvider(statsProvider)).toEqual(statsProvider)
    })

    test('should return StatsProvider.SPOTIFY when statsProvider is not a StatsProvider', () => {
      expect(validateStatsProvider(invalid)).toEqual(StatsProvider.SPOTIFY)
    })
  })
})
