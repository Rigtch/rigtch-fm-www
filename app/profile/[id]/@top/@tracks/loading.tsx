'use client'

import { useSearchParams } from 'next/navigation'

import { STATS_PROVIDER, VIEW } from '@app/profile/constants'
import { StatsProvider } from '@app/profile/enums'
import { ItemsSectionSkeleton } from '@app/profile/sections'
import {
  validateStatsProvider,
  validateView,
} from '@app/profile/utils/validators'

export default function ProfileTopTracksSubLoading() {
  const searchParams = useSearchParams()

  const view = validateView(searchParams.get(VIEW))
  const statsProvider = validateStatsProvider(searchParams.get(STATS_PROVIDER))

  return (
    <ItemsSectionSkeleton
      title={'Top Tracks'}
      view={view}
      withProgress={statsProvider === StatsProvider.RIGTCH}
    />
  )
}
