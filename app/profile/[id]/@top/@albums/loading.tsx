'use client'

import { useSearchParams } from 'next/navigation'

import { STATS_PROVIDER, VIEW } from '@app/profile/constants'
import { TopAlbumsSkeletonSection } from '@app/profile/sections'
import { validateView } from '@app/profile/utils/view'
import { validateStatsProvider } from '@app/profile/utils/stats-provider'
import { StatsProvider } from '@app/profile/types'

export default function ProfileTopAlbumsSubLoading() {
  const searchParams = useSearchParams()

  const view = validateView(searchParams.get(VIEW))
  const statsProvider = validateStatsProvider(searchParams.get(STATS_PROVIDER))

  if (statsProvider === StatsProvider.SPOTIFY) return null

  return <TopAlbumsSkeletonSection view={view} />
}
