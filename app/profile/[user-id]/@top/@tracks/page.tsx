import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'

import { ACCESS_TOKEN } from '@app/api/constants'
import { getTopTracks } from '@app/api/fetchers'
import { TopItemsSection } from '@app/profile/sections'
import { validateTimeRange } from '@app/utils/time-range'
import { validateView } from '@app/utils/view'
import { TIME_RANGE, USER_ID, VIEW } from '@app/constants'
import { SeeMoreButton } from '@app/components/common'
import { ProfilePageProps } from '@app/profile/types'

export default async function ProfileTopTracksSubPage({
  searchParams,
  params,
}: ProfilePageProps) {
  const timeRange = validateTimeRange(searchParams[TIME_RANGE])
  const view = validateView(searchParams[VIEW])
  const userId = params[USER_ID]?.toString()

  const accessToken = cookies().get(ACCESS_TOKEN)?.value

  if (!userId) return notFound()
  if (!accessToken) redirect('/')

  const { items: tracks } = await getTopTracks(accessToken, {
    timeRange,
    userId,
    limit: 10,
  })

  return (
    <TopItemsSection items={tracks} title="Top Tracks" view={view}>
      <SeeMoreButton href={`/profile/${userId}/top/tracks`} />
    </TopItemsSection>
  )
}
