'use client'

import { useSearchParams } from 'next/navigation'

import { ItemsSectionSkeleton } from '@app/profile/sections'
import { STATS_PROVIDER, VIEW } from '@app/profile/constants'
import {
  validateStatsProvider,
  validateView,
} from '@app/profile/utils/validators'
import { StatsProvider } from '@app/profile/enums'

export default function ProfileTopArtistsLoading() {
  const searchParams = useSearchParams()

  const view = validateView(searchParams.get(VIEW))
  const statsProvider = validateStatsProvider(searchParams.get(STATS_PROVIDER))

  return (
    <ItemsSectionSkeleton
      title={'Top Artists'}
      view={view}
      withGenres
      withProgress={statsProvider === StatsProvider.RIGTCH}
    />
  )
}
