'use client'

import { useSearchParams } from 'next/navigation'

import { STATS_PROVIDER, VIEW } from '@app/profile/constants'
import { TopAlbumsSkeletonSection } from '@app/profile/sections'
import {
  validateStatsProvider,
  validateView,
} from '@app/profile/utils/validators'
import { StatsProvider } from '@app/profile/types'

export default function ProfileTopAlbumsSubLoading() {
  const searchParams = useSearchParams()

  const view = validateView(searchParams.get(VIEW))
  const statsProvider = validateStatsProvider(searchParams.get(STATS_PROVIDER))

  if (statsProvider === StatsProvider.SPOTIFY) return null

  return <TopAlbumsSkeletonSection view={view} />
}
