import type { StatsProvider } from './stats-provider'

import type {
  RigtchTimeRange,
  SpotifyTimeRange,
  StatsMeasurement,
} from '@app/api/types'
import type {
  STATS_MEASUREMENT,
  STATS_PROVIDER,
  TIME_RANGE,
  USER_ID,
  VIEW,
} from '@app/constants'
import type { LayoutProps, PageProps, View } from '@app/types'

export interface ProfilePageProps extends PageProps {
  params: {
    [USER_ID]?: string
  }
  searchParams: ProfilePageSearchParams
}

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

export interface ProfileLayoutBaseProps extends LayoutProps {
  params: {
    [USER_ID]?: string
  }
}
