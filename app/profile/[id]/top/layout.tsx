'use client'

import { usePathname, useSearchParams } from 'next/navigation'

import {
  STATS_MEASUREMENT,
  STATS_PROVIDER,
  TIME_RANGE,
  VIEW,
} from '@app/profile/constants'
import { ToggleStatsProvider } from '@app/profile/components/common'
import {
  SelectStatsMeasurement,
  SelectTimeRange,
  SelectView,
} from '@app/profile/components/common/selects'
import type { ProfileLayoutBaseProps } from '@app/profile/types'
import { StatsProvider } from '@app/profile/enums'
import {
  validateStatsProvider,
  validateView,
  validateTimeRange,
  validateStatsMeasurement,
} from '@app/profile/utils/validators'

export default function ProfileTopLayout({ children }: ProfileLayoutBaseProps) {
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
    <>
      <div className="flex justify-between flex-col md:flex-row gap-4 items-stretch md:items-center">
        <div>
          {route !== 'albums' && (
            <ToggleStatsProvider initialValue={statsProvider} />
          )}
        </div>

        <div className="flex gap-2">
          {statsProvider === StatsProvider.RIGTCH ||
            (route === 'albums' && (
              <SelectStatsMeasurement initialValue={statsMeasurement} />
            ))}

          <SelectTimeRange initialValue={timeRange} />

          {route !== 'genres' && <SelectView initialValue={view} />}
        </div>
      </div>

      {children}
    </>
  )
}
