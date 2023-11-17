import { isTimeRange } from './is-time-range'

import { TimeRange } from '@api/types'
import { SearchParams } from '@common/types'

export function getTimeRangeFromSearchParams(searchParams: SearchParams) {
  const timeRange = searchParams['time-range']

  if (typeof timeRange === 'string' && isTimeRange(timeRange)) return timeRange

  return TimeRange.SHORT_TERM
}
