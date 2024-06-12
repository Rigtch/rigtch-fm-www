import { redirect } from 'next/navigation'

import { validateId } from '@app/utils/validate-id'
import { getTopArtists } from '@app/api/fetchers'
import { validateTimeRange } from '@app/profile/utils/time-range'
import { TopItemsSection } from '@app/profile/sections'
import { validateView } from '@app/profile/utils/view'
import { TIME_RANGE, USER_ID, VIEW } from '@app/constants'
import { ToggleTimeRange, SelectView } from '@app/components/common'
import { ProfilePageProps } from '@app/profile/types'
import { getServerToken } from '@app/auth/utils'

export const runtime = 'edge'

export default async function ProfileTopArtistsPage({
  searchParams,
  params,
}: ProfilePageProps) {
  const timeRange = validateTimeRange(searchParams[TIME_RANGE])
  const view = validateView(searchParams[VIEW])
  const userId = validateId(params[USER_ID])

  const token = await getServerToken()

  if (!token) redirect('/')

  const artistsFirstPart = await getTopArtists(token, {
    timeRange,
    userId,
    limit: 50,
  })
  const artistsSecondPart = await getTopArtists(token, {
    timeRange,
    userId,
    limit: 50,
    offset: 49,
  })

  // Remove the first item of the second part to avoid duplicates
  artistsSecondPart.items.shift()
  const artists = artistsFirstPart.items.concat(artistsSecondPart.items)

  return (
    <>
      <div className="flex justify-between flex-col md:flex-row gap-4 items-stretch md:items-center">
        <ToggleTimeRange initialValue={timeRange} />

        <div>
          <SelectView initialValue={view} />
        </div>
      </div>

      <TopItemsSection items={artists} title="Top Artists" view={view} />
    </>
  )
}
