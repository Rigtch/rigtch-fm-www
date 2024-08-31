import prettyMilliseconds from 'pretty-ms'

import { StatsMeasurement } from '@app/api/enums'

export function valueMeasurementFormatter(
  value: number,
  measurement: StatsMeasurement,
  showZero = false
) {
  if (value === 0 && !showZero) return 'nothing'

  return measurement === StatsMeasurement.PLAYS
    ? `${value} plays`
    : prettyMilliseconds(value, { unitCount: 2 })
}
