import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { validateId } from '@app/utils/validate-id'
import { ACCESS_TOKEN } from '@app/api/constants'
import { getTopArtists } from '@app/api/fetchers'
import { validateTimeRange } from '@app/profile/utils/time-range'
import { TopItemsSection } from '@app/profile/sections'
import { validateView } from '@app/profile/utils/view'
import { TIME_RANGE, USER_ID, VIEW } from '@app/constants'
import { SeeMoreButton } from '@app/components/common'
import { ProfilePageProps } from '@app/profile/types'

export default async function ProfileTopArtistsSubPage({
  searchParams,
  params,
}: ProfilePageProps) {
  const timeRange = validateTimeRange(searchParams[TIME_RANGE])
  const view = validateView(searchParams[VIEW])
  const userId = validateId(params[USER_ID])

  const accessToken = cookies().get(ACCESS_TOKEN)?.value

  if (!accessToken) redirect('/')

  const { items: artists } = await getTopArtists(accessToken, {
    timeRange,
    userId,
    limit: 10,
  })

  return (
    <TopItemsSection items={artists} title="Top Artists" view={view}>
      <SeeMoreButton href={`/profile/${userId}/top/artists`} />
    </TopItemsSection>
  )
}
