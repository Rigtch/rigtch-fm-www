'use client'

import { useSearchParams } from 'next/navigation'

import { VIEW } from '@app/constants'
import { TopAlbumsSkeletonSection } from '@app/profile/sections'
import { validateView } from '@app/profile/utils/view'

export default function ProfileTopArtistsLoading() {
  const searchParams = useSearchParams()

  const view = validateView(searchParams.get(VIEW))

  return <TopAlbumsSkeletonSection view={view} />
}
