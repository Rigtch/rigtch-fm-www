'use client'

import { useSearchParams } from 'next/navigation'

import { VIEW } from '@app/profile/constants'
import { TopArtistsSectionSkeleton } from '@app/profile/sections'
import { validateView } from '@app/profile/utils/validators'

export default function ProfileTopArtistsSubLoading() {
  const searchParams = useSearchParams()

  const view = validateView(searchParams.get(VIEW))

  return <TopArtistsSectionSkeleton view={view} />
}
