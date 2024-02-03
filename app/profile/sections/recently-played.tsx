'use server'

import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'

import { ProfileTopSectionProps } from '../types'

import { ItemsSection } from './items'

import { ACCESS_TOKEN } from '@app/api/constants'
import { getRecentlyPlayed } from '@app/api/fetchers'

export async function ProfileRecentlyPlayedSection({
  limit,
  userId,
  children,
}: Omit<ProfileTopSectionProps, 'searchParams'>) {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value

  if (!userId) return notFound()
  if (!accessToken) redirect('/')

  const recentlyPlayedTracks = await getRecentlyPlayed(accessToken, {
    limit,
    userId,
  })

  return (
    <ItemsSection
      items={recentlyPlayedTracks.items}
      title="Recently Played"
      withoutPosition
    >
      {children && <div className="flex justify-center">{children}</div>}
    </ItemsSection>
  )
}
