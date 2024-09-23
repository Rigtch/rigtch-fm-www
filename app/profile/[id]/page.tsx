import { Suspense } from 'react'
import { redirect } from 'next/navigation'

import { TopGenresSectionSkeleton } from '../sections'
import type { ProfilePageProps } from '../types'
import {
  STATS_PROVIDER,
  STATS_MEASUREMENT,
  TIME_RANGE,
  VIEW,
} from '../constants'
import { isPublicUser } from '../utils/helpers'
import {
  validateStatsProvider,
  validateStatsMeasurement,
  validateTimeRange,
  validateView,
} from '../utils/validators'

import { TopGenresView } from './views'
import type { ProfileOverviewViewProps } from './views/types/props'

import { getUser } from '@app/api/fetchers'
import { getServerToken } from '@app/auth'
import { validateId } from '@app/utils/validators'

export const runtime = 'edge'

export default async function ProfilePage({
  params,
  searchParams,
}: ProfilePageProps) {
  const token = await getServerToken()
  const userId = validateId(params.id)

  if (!token && !isPublicUser(userId)) redirect('/')

  const { createdAt } = await getUser(token ?? '', {
    userId,
  })

  const statsProvider = validateStatsProvider(
    searchParams[STATS_PROVIDER],
    createdAt
  )
  const measurement = validateStatsMeasurement(searchParams[STATS_MEASUREMENT])
  const timeRange = validateTimeRange(
    searchParams[TIME_RANGE],
    statsProvider,
    createdAt
  )
  const view = validateView(searchParams[VIEW])

  const viewProps: ProfileOverviewViewProps = {
    token: token ?? '',
    userId,
    measurement,
    statsProvider,
    timeRange,
    view,
  }

  return (
    <Suspense fallback={<TopGenresSectionSkeleton length={10} />}>
      <TopGenresView {...viewProps} />
    </Suspense>
  )
}
