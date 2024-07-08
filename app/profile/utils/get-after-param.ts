import { RigtchTimeRange } from '@app/api/types'

export function getAfterParam(timeRange: RigtchTimeRange) {
  switch (timeRange) {
    case RigtchTimeRange.WEEK: {
      return new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)
    }
    case RigtchTimeRange.TWO_WEEKS: {
      return new Date(Date.now() - 1000 * 60 * 60 * 24 * 14)
    }
    case RigtchTimeRange.MONTH: {
      return new Date(Date.now() - 1000 * 60 * 60 * 24 * 30)
    }
    case RigtchTimeRange.THREE_MONTHS: {
      return new Date(Date.now() - 1000 * 60 * 60 * 24 * 90)
    }
    default: {
      return new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)
    }
  }
}
