import type { ProfileOverviewViewProps } from './types/props'

import { getHistory } from '@app/api/fetchers'
import { SeeMoreButton } from '@app/components/common/buttons'
import { View } from '@app/profile/enums'
import { ItemsSection } from '@app/profile/sections'

export async function HistoryView({
  token,
  userId,
}: Readonly<Pick<ProfileOverviewViewProps, 'token' | 'userId'>>) {
  const history = await getHistory(token, {
    limit: 10,
    userId,
    page: 1,
  })

  return (
    <ItemsSection
      items={history.data.map(({ track, playedAt }) => ({
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
