import { valueMeasurementFormatter } from './value-measurement-formatter'

import { StatsMeasurement } from '@app/api/enums'

describe('valueMeasurementFormatter', () => {
  test('should return formatted value', () => {
    const milliseconds = 1000 * 60 * 60 * 4

    expect(valueMeasurementFormatter(100, StatsMeasurement.PLAYS)).toBe(
      '100 plays'
    )
    expect(
      valueMeasurementFormatter(milliseconds, StatsMeasurement.PLAY_TIME)
    ).toBe('4h')
  })

  test('should return `nothing` when value is 0', () => {
    expect(valueMeasurementFormatter(0, StatsMeasurement.PLAYS)).toBe('0 plays')
    expect(valueMeasurementFormatter(0, StatsMeasurement.PLAY_TIME)).toBe('0ms')
  })
})
