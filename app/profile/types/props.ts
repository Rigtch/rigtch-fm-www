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
  VIEW,
} from '@app/constants'
import type { LayoutProps, PageWithIdParamProps, View } from '@app/types'

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

export interface ProfilePageProps extends PageWithIdParamProps {
  searchParams: ProfilePageSearchParams
}

export type ProfileLayoutBaseProps = LayoutProps & PageWithIdParamProps
