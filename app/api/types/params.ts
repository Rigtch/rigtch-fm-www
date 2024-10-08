import type { StatsMeasurement } from '../enums'

import type { SpotifyTimeRange } from '@app/profile/enums'

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

export type ReportsListeningParams = Omit<RigtchStatsParams, 'limit'>
export type ReportsTotalItemsParams = Omit<
  ReportsListeningParams,
  'measurement'
>
