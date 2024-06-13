import { redirect } from 'next/navigation'

import { validateId } from '@app/utils/validate-id'
import { ItemsSection } from '@app/profile/sections'
import { ProfilePageProps } from '@app/profile/types'
import { USER_ID } from '@app/constants'
import { getHistory } from '@app/api/fetchers'
import { SeeMoreButton } from '@app/components/common/buttons'
import { getServerToken } from '@app/auth/utils'

export default async function ProfileHistorySubPage({
  params,
}: ProfilePageProps) {
  const userId = validateId(params[USER_ID])
  const token = await getServerToken()

  if (!token) redirect('/')

  const recentlyPlayedTracks = await getHistory(token, {
    limit: 10,
    userId,
    page: 1,
  })

  return (
    <ItemsSection
      items={recentlyPlayedTracks.data.map(({ track, playedAt }) => ({
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
