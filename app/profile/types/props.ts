import type { StatsProvider } from './stats-provider'

import type {
  RigtchTimeRange,
  SpotifyTimeRange,
  StatsMeasurement,
} from '@app/api/types'
import type {
  ID,
  STATS_MEASUREMENT,
  STATS_PROVIDER,
  TIME_RANGE,
  VIEW,
} from '@app/constants'
import type { LayoutProps, View } from '@app/types'

export type ProfilePageSearchParams =
  | {
      [TIME_RANGE]: SpotifyTimeRange
      [VIEW]: View
      [STATS_PROVIDER]: StatsProvider
      [STATS_MEASUREMENT]?: never
    }
  | {
      [VIEW]: View
      [STATS_PROVIDER]: StatsProvider
      [TIME_RANGE]: RigtchTimeRange
      [STATS_MEASUREMENT]: StatsMeasurement
    }

export interface ProfilePageParams {
  [ID]?: string
}
export interface ProfilePageProps {
  params: ProfilePageParams
  searchParams: ProfilePageSearchParams
}

export interface ProfileLayoutBaseProps extends LayoutProps {
  params: ProfilePageParams
}
