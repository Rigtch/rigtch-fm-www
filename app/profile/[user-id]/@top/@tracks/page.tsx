import { redirect } from 'next/navigation'

import { validateId } from '@app/utils/validate-id'
import { getTopTracks } from '@app/api/fetchers'
import { ItemsSection } from '@app/profile/sections'
import { validateTimeRange } from '@app/profile/utils/time-range'
import { validateView } from '@app/profile/utils/view'
import { TIME_RANGE, USER_ID, VIEW } from '@app/constants'
import { SeeMoreButton } from '@app/components/common/buttons'
import type { ProfilePageProps } from '@app/profile/types'
import { getServerToken } from '@app/auth/utils'

export default async function ProfileTopTracksSubPage({
  searchParams,
  params,
}: ProfilePageProps) {
  const timeRange = validateTimeRange(searchParams[TIME_RANGE])
  const view = validateView(searchParams[VIEW])
  const userId = validateId(params[USER_ID])

  const token = await getServerToken()

  if (!token) redirect('/')

  const { items: tracks } = await getTopTracks(token, {
    timeRange,
    userId,
    limit: 10,
  })

  return (
    <ItemsSection items={tracks} title="Top Tracks" view={view}>
      <SeeMoreButton href={`/profile/${userId}/top/tracks`} />
    </ItemsSection>
  )
}
