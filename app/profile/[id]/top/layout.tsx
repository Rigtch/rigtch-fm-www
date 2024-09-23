'use client'

import { useSearchParams } from 'next/navigation'

import { useUserQuery } from '@app/api/hooks'
import { StatsOptions } from '@app/profile/components/common'
import {
  STATS_PROVIDER,
  STATS_MEASUREMENT,
  VIEW,
  TIME_RANGE,
  BETA_USER_CREATED_AT,
} from '@app/profile/constants'
import type { ProfileLayoutBaseProps } from '@app/profile/types'
import {
  validateStatsProvider,
  validateStatsMeasurement,
  validateView,
  validateTimeRange,
} from '@app/profile/utils/validators'

export default function ProfileTopLayout({ children }: ProfileLayoutBaseProps) {
  const { data: user } = useUserQuery()
  const searchParams = useSearchParams()

  const statsProvider = validateStatsProvider(
    searchParams.get(STATS_PROVIDER),
    user?.createdAt
  )
  const measurement = validateStatsMeasurement(
    searchParams.get(STATS_MEASUREMENT)
  )
  const view = validateView(searchParams.get(VIEW))
  const timeRange = validateTimeRange(
    searchParams.get(TIME_RANGE),
    statsProvider,
    user?.createdAt
  )

  const userCreatedAt = user?.createdAt ?? BETA_USER_CREATED_AT

  return (
    <>
      <StatsOptions
        statsProvider={statsProvider}
        measurement={measurement}
        timeRange={timeRange}
        view={view}
        userCreatedAt={userCreatedAt}
      />

      {children}
    </>
  )
}
