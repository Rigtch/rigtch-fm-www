'use server'

import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'

import { ProfileTopSectionProps } from '../types'

import { TopItemsSection } from './top-items'

import { ACCESS_TOKEN } from '@app/api/constants'
import { getTopTracks } from '@app/api/fetchers'
import { validateTimeRange } from '@app/utils/time-range'
import { validateView } from '@app/utils/view'
import { TIME_RANGE, VIEW } from '@app/constants'

export async function ProfileTopTracksSection({
  searchParams,
  userId,
  limit,
  children,
}: ProfileTopSectionProps) {
  const timeRange = validateTimeRange(searchParams[TIME_RANGE])
  const view = validateView(searchParams[VIEW])

  const accessToken = cookies().get(ACCESS_TOKEN)?.value

  if (!userId) return notFound()
  if (!accessToken) redirect('/')

  const tracks = await getTopTracks(accessToken, {
    limit,
    userId,
    timeRange,
  })

  return (
    <TopItemsSection items={tracks.items} title="Top Tracks" view={view}>
      {children && <div className="flex justify-center">{children}</div>}
    </TopItemsSection>
  )
}
