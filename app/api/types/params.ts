import { TimeRange } from './time-range'

export interface UsersParams {
  userId: string
}

export interface PaginationParams {
  limit?: number
  page?: number
}

export interface HistoryParams extends UsersParams, PaginationParams {}

export interface GetTopItemsParams extends UsersParams {
  limit?: number
  offset?: number
  timeRange?: TimeRange
}
