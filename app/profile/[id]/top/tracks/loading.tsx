'use client'

import { useSearchParams } from 'next/navigation'

import { TopTracksSkeletonSection } from '@app/profile/sections'
import { VIEW } from '@app/constants'
import { validateView } from '@app/profile/utils/view'

export default function ProfileTopTracksLoading() {
  const searchParams = useSearchParams()

  const view = validateView(searchParams.get(VIEW))

  return <TopTracksSkeletonSection view={view} />
}
