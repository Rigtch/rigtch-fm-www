import { validateStatsMeasurement } from './validate-stats-measurement'

import { StatsMeasurement } from '@app/api/enums'

describe('validateStatsMeasurement', () => {
  const statsMeasurement = StatsMeasurement.PLAYS
  const invalid = 'invalid'

  test('should return statsMeasurement when statsMeasurement is a StatsMeasurement', () => {
    expect(validateStatsMeasurement(statsMeasurement)).toEqual(statsMeasurement)
  })

  test('should return StatsMeasurement.PLAYS when statsMeasurement is not a StatsMeasurement', () => {
    expect(validateStatsMeasurement(invalid)).toEqual(StatsMeasurement.PLAYS)
  })
})
