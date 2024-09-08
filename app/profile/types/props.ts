import type {
  StatsProvider,
  RigtchTimeRange,
  SpotifyTimeRange,
  View,
} from '../enums'

import type { StatsMeasurement } from '@app/api/enums'
import type {
  STATS_MEASUREMENT,
  STATS_PROVIDER,
  TIME_RANGE,
  VIEW,
} from '@app/profile/constants'
import type { LayoutProps, PageWithIdParamProps } from '@app/types'

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

export type ProfilePageProps = Readonly<
  PageWithIdParamProps & {
    searchParams: ProfilePageSearchParams
  }
>

export type ProfileLayoutBaseProps = Readonly<
  LayoutProps & PageWithIdParamProps
>
