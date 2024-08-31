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
    expect(valueMeasurementFormatter(0, StatsMeasurement.PLAYS)).toBe('nothing')
    expect(valueMeasurementFormatter(0, StatsMeasurement.PLAY_TIME)).toBe(
      'nothing'
    )
  })

  test('should not return `nothing` with `showZero` set to true', () => {
    expect(valueMeasurementFormatter(0, StatsMeasurement.PLAYS, true)).toBe(
      '0 plays'
    )
    expect(valueMeasurementFormatter(0, StatsMeasurement.PLAY_TIME, true)).toBe(
      '0ms'
    )
  })
})
