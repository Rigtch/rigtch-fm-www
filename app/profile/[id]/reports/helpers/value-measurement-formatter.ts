import prettyMilliseconds from 'pretty-ms'

import { StatsMeasurement } from '@app/api/enums'

export const valueMeasurementFormatter = (
  value: number,
  measurement: StatsMeasurement
) =>
  measurement === StatsMeasurement.PLAYS
    ? `${value} plays`
    : prettyMilliseconds(value, { unitCount: 2 })
