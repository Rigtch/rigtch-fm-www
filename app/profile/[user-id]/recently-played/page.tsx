import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'

import { ItemsSection } from '../../sections'

import { PageProps } from '@app/types'
import { USER_ID } from '@app/constants'
import { ACCESS_TOKEN } from '@app/api/constants'
import { getRecentlyPlayed } from '@app/api/fetchers'

export const runtime = 'edge'

export default async function ProfileRecentlyPlayedPage({ params }: PageProps) {
  const userId = params?.[USER_ID]?.toString()
  const accessToken = cookies().get(ACCESS_TOKEN)?.value

  if (!userId) return notFound()
  if (!accessToken) redirect('/')

  const recentlyPlayedTracks = await getRecentlyPlayed(accessToken, {
    limit: 50,
    userId,
  })

  return (
    <ItemsSection
      items={recentlyPlayedTracks.items}
      title="Recently Played"
      withoutPosition
    />
  )
}
