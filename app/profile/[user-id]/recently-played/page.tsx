import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { ItemsSection } from '../../sections'

import { USER_ID } from '@app/constants'
import { ACCESS_TOKEN } from '@app/api/constants'
import { getRecentlyPlayed } from '@app/api/fetchers'
import { ProfilePageProps } from '@app/profile/types'
import { validateUserId } from '@app/utils/user-id'

export const runtime = 'edge'

export default async function ProfileRecentlyPlayedPage({
  params,
}: ProfilePageProps) {
  const userId = validateUserId(params[USER_ID])
  const accessToken = cookies().get(ACCESS_TOKEN)?.value

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
