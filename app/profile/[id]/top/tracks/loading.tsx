'use client'

import { useSearchParams } from 'next/navigation'

import { TopTracksSectionSkeleton } from '@app/profile/sections'
import { VIEW } from '@app/profile/constants'
import { validateView } from '@app/profile/utils/validators'

export default function ProfileTopTracksLoading() {
  const searchParams = useSearchParams()

  const view = validateView(searchParams.get(VIEW))

  return <TopTracksSectionSkeleton view={view} />
}
