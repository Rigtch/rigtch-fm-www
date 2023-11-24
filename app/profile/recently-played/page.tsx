import { cookies } from 'next/headers'

import { ItemsSection } from '@app/profile/sections/items'
import { getLastTracks } from '@app/api/fetchers'
import { ACCESS_TOKEN } from '@app/api/constants'

export default async function ProfileRecentlyPlayedPage() {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value

  const recentlyPlayedTracks = await getLastTracks(accessToken, 50)

  return (
    <ItemsSection items={recentlyPlayedTracks.items} title="Recently Played" />
  )
}
