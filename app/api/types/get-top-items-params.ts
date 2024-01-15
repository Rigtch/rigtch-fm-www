import { TimeRange } from './time-range'
import { UsersParams } from './users-params'

export interface GetTopItemsParams extends UsersParams {
  limit?: number
  offset?: number
  timeRange?: TimeRange
}
