import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { validateId } from '@app/utils/validate-id'
import { ItemsSection } from '@app/profile/sections'
import { ProfilePageProps } from '@app/profile/types'
import { USER_ID } from '@app/constants'
import { ACCESS_TOKEN } from '@app/api/constants'
import { getHistory } from '@app/api/fetchers'
import { SeeMoreButton } from '@app/components/common'

export default async function ProfileHistorySubPage({
  params,
}: ProfilePageProps) {
  const userId = validateId(params[USER_ID])
  const accessToken = cookies().get(ACCESS_TOKEN)?.value

  if (!accessToken) redirect('/')

  const recentlyPlayedTracks = await getHistory(accessToken, {
    limit: 10,
    userId,
    page: 1,
  })

  return (
    <ItemsSection
      items={recentlyPlayedTracks.items.map(({ track, playedAt }) => ({
        ...track,
        playedAt,
      }))}
      title="History"
      withoutPosition
    >
      <SeeMoreButton href={`/profile/${userId}/history`} />
    </ItemsSection>
  )
}
