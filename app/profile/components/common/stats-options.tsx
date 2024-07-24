'use client'

import { usePathname, useSearchParams } from 'next/navigation'

import { SelectStatsMeasurement, SelectTimeRange, SelectView } from './selects'
import { ToggleStatsProvider } from './toggle-stats-provider'

import { useUserQuery } from '@app/api/hooks'
import {
  STATS_MEASUREMENT,
  STATS_PROVIDER,
  TIME_RANGE,
  VIEW,
} from '@app/profile/constants'
import { StatsProvider } from '@app/profile/enums'
import {
  validateStatsMeasurement,
  validateStatsProvider,
  validateTimeRange,
  validateView,
} from '@app/profile/utils/validators'

export function StatsOptions() {
  const { data: user } = useUserQuery()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const statsProvider = validateStatsProvider(searchParams.get(STATS_PROVIDER))
  const statsMeasurement = validateStatsMeasurement(
    searchParams.get(STATS_MEASUREMENT)
  )
  const view = validateView(searchParams.get(VIEW))
  const timeRange = validateTimeRange(
    searchParams.get(TIME_RANGE),
    statsProvider
  )

  const route = pathname.split('/').at(-1)

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
