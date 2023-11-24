import { isTimeRange, validateTimeRange } from './time-range'

import { TIME_RANGE } from '@app/constants/index'
import { SearchParams } from '@app/types'
import { TimeRange } from '@app/api/types'

describe('TimeRange', () => {
  const timeRange = TimeRange.MEDIUM_TERM
  const invalid = 'invalid'

  describe('isTimeRange', () => {
    test('should return true when value is a TimeRange', () => {
      expect(isTimeRange(timeRange)).toBeTruthy()
    })

    test('should return false when value is not a TimeRange', () => {
      expect(isTimeRange(invalid)).toBeFalsy()
    })
  })

  describe('validateTimeRange', () => {
    test('should return timeRange when timeRange is a TimeRange', () => {
      expect(validateTimeRange(timeRange)).toEqual(timeRange)
    })

    test('should return TimeRange.SHORT_TERM when timeRange is not a TimeRange', () => {
      expect(validateTimeRange(invalid)).toEqual(TimeRange.SHORT_TERM)
    })
  })

  describe('getTimeRangeFromSearchParams', () => {
    const searchParamsMock: SearchParams = {}

    beforeEach(() => {
      searchParamsMock[TIME_RANGE] = timeRange
    })

    test('should return timeRange when timeRange is a TimeRange', () => {
      expect(validateTimeRange(timeRange)).toEqual(timeRange)
    })
  })
})
