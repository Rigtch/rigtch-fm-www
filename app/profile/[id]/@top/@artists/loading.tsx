'use client'

import { useSearchParams } from 'next/navigation'

import { VIEW } from '@app/profile/constants'
import { TopArtistsSkeletonSection } from '@app/profile/sections'
import { validateView } from '@app/profile/utils/view'

export default function ProfileTopArtistsSubLoading() {
  const searchParams = useSearchParams()

  const view = validateView(searchParams.get(VIEW))

  return <TopArtistsSkeletonSection view={view} />
}
