import {
  isStatsMeasurement,
  validateStatsMeasurement,
} from './stats-measurement'

import { StatsMeasurement } from '@app/api/types'

describe('StatsMeasurement', () => {
  const statsMeasurement = StatsMeasurement.PLAYS
  const invalid = 'invalid'

  describe('isStatsMeasurement', () => {
    test('should return true when value is a StatsMeasurement', () => {
      expect(isStatsMeasurement(statsMeasurement)).toBeTruthy()
    })

    test('should return false when value is not a StatsMeasurement', () => {
      expect(isStatsMeasurement(invalid)).toBeFalsy()
    })
  })

  describe('validateStatsMeasurement', () => {
    test('should return statsMeasurement when statsMeasurement is a StatsMeasurement', () => {
      expect(validateStatsMeasurement(statsMeasurement)).toEqual(
        statsMeasurement
      )
    })

    test('should return StatsMeasurement.PLAYS when statsMeasurement is not a StatsMeasurement', () => {
      expect(validateStatsMeasurement(invalid)).toEqual(StatsMeasurement.PLAYS)
    })
  })
})
