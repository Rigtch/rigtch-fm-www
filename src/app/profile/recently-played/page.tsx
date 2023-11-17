import { cookies } from 'next/headers'

import { getLastTracks } from '@api/fetchers'
import { ACCESS_TOKEN } from '@api/constants'
import { ItemsSection } from '@sections/items'

export default async function ProfileRecentlyPlayedPage() {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value

  const recentlyPlayedTracks = await getLastTracks(accessToken, 50)

  return (
    <>
      <ItemsSection
        items={recentlyPlayedTracks.items}
        title="Recently Played"
      />
    </>
  )
}
