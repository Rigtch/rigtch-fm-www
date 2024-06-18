'use client'

import { useSearchParams } from 'next/navigation'

import { VIEW } from '@app/constants'
import { TopTracksSkeletonSection } from '@app/profile/sections'
import { validateView } from '@app/profile/utils/view'
export default function ProfileTopTracksSubLoading() {
  const searchParams = useSearchParams()

  const view = validateView(searchParams.get(VIEW))

  return <TopTracksSkeletonSection view={view} />
}
