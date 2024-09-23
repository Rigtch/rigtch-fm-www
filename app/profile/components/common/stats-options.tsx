'use client'

import { usePathname } from 'next/navigation'

import { SelectStatsMeasurement, SelectTimeRange, SelectView } from './selects'
import { ToggleStatsProvider } from './toggle-stats-provider'

import type { ProfileOverviewViewProps } from '@app/profile/[id]/views/types/props'
import { StatsProvider } from '@app/profile/enums'

namespace StatsOptions {
  export type Props = Readonly<
    Omit<ProfileOverviewViewProps, 'token' | 'userId'> & {
      userCreatedAt: Date
    }
  >
}

function StatsOptions({
  statsProvider,
  measurement,
  timeRange,
  view,
  userCreatedAt,
}: StatsOptions.Props) {
  const pathname = usePathname()

  const route = pathname.split('/').at(-1)

  return (
    <div className="flex flex-col items-stretch justify-between gap-4 md:flex-row md:items-center">
      <div>
        {(!route || route !== 'albums') && (
          <ToggleStatsProvider
            initialValue={statsProvider}
            userCreatedAt={userCreatedAt}
          />
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {(statsProvider === StatsProvider.RIGTCH || route === 'albums') && (
          <SelectStatsMeasurement initialValue={measurement} />
        )}

        <SelectTimeRange
          initialValue={timeRange}
          userCreatedAt={userCreatedAt}
        />

        {(!route || route !== 'genres') && <SelectView initialValue={view} />}
      </div>
    </div>
  )
}

export { StatsOptions }
