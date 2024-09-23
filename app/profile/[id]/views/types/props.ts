import type { StatsMeasurement } from '@app/api/enums'
import type {
  RigtchTimeRange,
  SpotifyTimeRange,
  StatsProvider,
  View,
} from '@app/profile/enums'

export type ProfileOverviewViewProps = Readonly<{
  token: string
  userId: string
  measurement: StatsMeasurement
  statsProvider: StatsProvider
  timeRange: RigtchTimeRange | SpotifyTimeRange
  view: View
}>
