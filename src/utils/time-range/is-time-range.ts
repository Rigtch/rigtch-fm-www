import { TimeRange } from '@api/types'

export function isTimeRange(value: string): value is TimeRange {
  return Object.values(TimeRange).includes(value as TimeRange)
}
