import { TimeRange } from '@api/types'
import { TIME_RANGE } from '@common/constants'
import { SearchParams } from '@common/types'

export function isTimeRange(value: string): value is TimeRange {
  return Object.values(TimeRange).includes(value as TimeRange)
}

export function validateTimeRange(timeRange?: string | string[] | null) {
  if (typeof timeRange === 'string' && isTimeRange(timeRange)) return timeRange

  return TimeRange.SHORT_TERM
}

export function getTimeRangeFromSearchParams(searchParams: SearchParams) {
  const timeRange = searchParams[TIME_RANGE]

  return validateTimeRange(timeRange)
}
