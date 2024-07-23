'use client'

import { usePathname, useSearchParams } from 'next/navigation'

import { StatsOptions } from '@app/profile/components/common'
import {
  STATS_MEASUREMENT,
  STATS_PROVIDER,
  TIME_RANGE,
  VIEW,
} from '@app/profile/constants'
import type { ProfileLayoutBaseProps } from '@app/profile/types'
import {
  validateStatsMeasurement,
  validateStatsProvider,
  validateTimeRange,
  validateView,
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
      <StatsOptions
        statsProvider={statsProvider}
        statsMeasurement={statsMeasurement}
        view={view}
        timeRange={timeRange}
        route={route}
      />

      {children}
    </>
  )
}
