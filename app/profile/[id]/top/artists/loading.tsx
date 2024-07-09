'use client'

import { useSearchParams } from 'next/navigation'

import { TopArtistsSkeletonSection } from '@app/profile/sections'
import { VIEW } from '@app/profile/constants'
import { validateView } from '@app/profile/utils/validators'

export default function ProfileTopArtistsLoading() {
  const searchParams = useSearchParams()

  const view = validateView(searchParams.get(VIEW))

  return <TopArtistsSkeletonSection view={view} />
}
