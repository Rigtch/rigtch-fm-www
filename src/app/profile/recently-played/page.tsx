import { cookies } from 'next/headers'

import { getLastTracks } from '@api/fetchers'
import { ACCESS_TOKEN } from '@api/constants'
import { RecentlyPlayedSection } from '@sections/profile'

export default async function ProfilePage() {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value

  const recentlyPlayedTracks = await getLastTracks(accessToken, 50)

  return (
    <>
      <RecentlyPlayedSection items={recentlyPlayedTracks.items} />
    </>
  )
}
