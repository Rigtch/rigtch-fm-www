'use client'

import { SelectStatsMeasurement, SelectTimeRange, SelectView } from './selects'
import { ToggleStatsProvider } from './toggle-stats-provider'

import type { StatsMeasurement } from '@app/api/enums'
import { StatsProvider } from '@app/profile/enums'
import type {
  RigtchTimeRange,
  SpotifyTimeRange,
  View,
} from '@app/profile/enums'
import { useUserQuery } from '@app/api/hooks'

namespace StatsOptions {
  export interface Props {
    statsProvider: StatsProvider
    statsMeasurement: StatsMeasurement
    view: View
    timeRange: RigtchTimeRange | SpotifyTimeRange
    route?: string
  }
}

function StatsOptions({
  statsProvider,
  statsMeasurement,
  view,
  timeRange,
  route,
}: StatsOptions.Props) {
  const { data: user } = useUserQuery()

  return (
    <div className="flex justify-between flex-col md:flex-row gap-4 items-stretch md:items-center">
      <div>
        {(!route || route !== 'albums') && (
          <ToggleStatsProvider
            initialValue={statsProvider}
            userCreatedAt={user?.createdAt}
          />
        )}
      </div>

      <div className="flex gap-2">
        {(statsProvider === StatsProvider.RIGTCH || route === 'albums') && (
          <SelectStatsMeasurement initialValue={statsMeasurement} />
        )}

        <SelectTimeRange
          initialValue={timeRange}
          userCreatedAt={user?.createdAt}
        />

        {(!route || route !== 'genres') && <SelectView initialValue={view} />}
      </div>
    </div>
  )
}

export { StatsOptions }
