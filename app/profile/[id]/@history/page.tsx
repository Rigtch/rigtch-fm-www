import { redirect } from 'next/navigation'

import { validateId } from '@app/utils/validate-id'
import { ItemsSection } from '@app/profile/sections'
import type { ProfilePageProps } from '@app/profile/types'
import { ID } from '@app/constants'
import { getHistory } from '@app/api/fetchers'
import { SeeMoreButton } from '@app/components/common/buttons'
import { getServerToken } from '@app/auth/utils'
import { View } from '@app/types'

export default async function ProfileHistorySubPage({
  params,
}: ProfilePageProps) {
  const userId = validateId(params[ID])
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
      view={View.LIST}
    >
      <SeeMoreButton href={`/profile/${userId}/history`} />
    </ItemsSection>
  )
}
