import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'

import { ACCESS_TOKEN } from '@app/api/constants'
import { getTopTracks } from '@app/api/fetchers'
import { PageProps } from '@app/types'
import { ProfileSection, TopItemsSection } from '@app/profile/sections'
import { validateTimeRange } from '@app/utils/time-range'
import { validateView } from '@app/utils/view'
import { TIME_RANGE, USER_ID, VIEW } from '@app/constants'
import { SelectView, ToggleTimeRange } from '@app/components/common'

export default async function ProfileTopTracksPage({
  searchParams,
  params,
}: PageProps) {
  const timeRange = validateTimeRange(searchParams[TIME_RANGE])
  const view = validateView(searchParams[VIEW])
  const userId = params?.[USER_ID]?.toString()

  const accessToken = cookies().get(ACCESS_TOKEN)?.value

  if (!userId) return notFound()
  if (!accessToken) redirect('/')

  const tracksFirstPart = await getTopTracks(accessToken, {
    timeRange,
    userId,
    limit: 50,
    offset: 0,
  })
  const tracksSecondPart = await getTopTracks(accessToken, {
    timeRange,
    userId,
    limit: 50,
    offset: 49,
  })

  // Remove the first item of the second part to avoid duplicates
  tracksSecondPart.items.shift()
  const tracks = tracksFirstPart.items.concat(tracksSecondPart.items)

  return (
    <>
      <ProfileSection userId={userId} />

      <div className="flex justify-between flex-col md:flex-row gap-4 items-stretch md:items-center">
        <ToggleTimeRange initialValue={timeRange} />

        <div>
          <SelectView initialValue={view} />
        </div>
      </div>

      <TopItemsSection items={tracks} title="Top Tracks" view={view} />
    </>
  )
}
