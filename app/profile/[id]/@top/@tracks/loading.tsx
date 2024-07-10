'use client'

import { useSearchParams } from 'next/navigation'

import { VIEW } from '@app/profile/constants'
import { TopTracksSectionSkeleton } from '@app/profile/sections'
import { validateView } from '@app/profile/utils/validators'
export default function ProfileTopTracksSubLoading() {
  const searchParams = useSearchParams()

  const view = validateView(searchParams.get(VIEW))

  return <TopTracksSectionSkeleton view={view} />
}
