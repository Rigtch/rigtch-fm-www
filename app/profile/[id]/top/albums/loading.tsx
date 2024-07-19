'use client'

import { useSearchParams } from 'next/navigation'

import { VIEW } from '@app/profile/constants'
import { ItemsSectionSkeleton } from '@app/profile/sections'
import { validateView } from '@app/profile/utils/validators'

export default function ProfileTopArtistsLoading() {
  const searchParams = useSearchParams()

  const view = validateView(searchParams.get(VIEW))

  return (
    <ItemsSectionSkeleton
      title={'Top Albums'}
      view={view}
      withArtists
      withProgress
    />
  )
}
