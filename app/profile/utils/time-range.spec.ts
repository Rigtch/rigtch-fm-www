import { isSpotifyTimeRange, validateTimeRange } from './time-range'

import { SpotifyTimeRange } from '@app/api/types'

describe('TimeRange', () => {
  const timeRange = SpotifyTimeRange.MEDIUM_TERM
  const invalid = 'invalid'

  describe('isTimeRange', () => {
    test('should return true when value is a TimeRange', () => {
      expect(isSpotifyTimeRange(timeRange)).toBeTruthy()
    })

    test('should return false when value is not a TimeRange', () => {
      expect(isSpotifyTimeRange(invalid)).toBeFalsy()
    })
  })

  describe('validateTimeRange', () => {
    test('should return timeRange when timeRange is a TimeRange', () => {
      expect(validateTimeRange(timeRange)).toEqual(timeRange)
    })

    test('should return TimeRange.SHORT_TERM when timeRange is not a TimeRange', () => {
      expect(validateTimeRange(invalid)).toEqual(SpotifyTimeRange.SHORT_TERM)
    })
  })
})
