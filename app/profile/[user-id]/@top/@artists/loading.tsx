'use client'

import { useSearchParams } from 'next/navigation'

import { VIEW } from '@app/constants'
import { TopArtistsSkeleton } from '@app/profile/sections'
import { validateView } from '@app/profile/utils/view'
import { View } from '@app/types'

export default function ProfileTopArtistsSubLoading() {
  const searchParams = useSearchParams()

  const view = validateView(searchParams.get(VIEW))

  return <TopArtistsSkeleton view={view === View.CARD} />
}
