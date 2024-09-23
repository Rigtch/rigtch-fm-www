import type { StatsMeasurement } from '@app/api/enums'
import type { ReportsCursors } from '@app/profile/[id]/reports/types/reports-cursors'

export type ReportsViewProps = Readonly<{
  token: string
  userId: string
  measurement: StatsMeasurement
  cursors: ReportsCursors
}>
