import type { StatsMeasurement } from './stats-measurement'
import type { SpotifyTimeRange } from './time-range'

export interface UsersParams {
  userId: string
}

export interface ItemParams {
  id: string
}

export interface PaginationParams {
  limit?: number
  page?: number
}

export interface HistoryParams extends UsersParams, PaginationParams {}

export interface GetTopItemsParams extends UsersParams {
  limit?: number
  offset?: number
  timeRange?: SpotifyTimeRange
}

export interface RigtchStatsParams extends UsersParams {
  before?: Date | null
  after: Date
  limit?: number
  measurement?: StatsMeasurement
}
