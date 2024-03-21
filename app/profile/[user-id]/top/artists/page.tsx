import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { ACCESS_TOKEN } from '@app/api/constants'
import { getTopArtists } from '@app/api/fetchers'
import { validateTimeRange } from '@app/profile/utils/time-range'
import { TopItemsSection } from '@app/profile/sections'
import { validateView } from '@app/profile/utils/view'
import { TIME_RANGE, USER_ID, VIEW } from '@app/constants'
import { ToggleTimeRange, SelectView } from '@app/components/common'
import { ProfilePageProps } from '@app/profile/types'
import { validateUserId } from '@app/profile/utils/user-id'
import { getSettingsCookie } from '@app/utils/settings-cookies'
export const runtime = 'edge'

export default async function ProfileTopArtistsPage({
  searchParams,
  params,
}: ProfilePageProps) {
  const timeRange = validateTimeRange(searchParams[TIME_RANGE])
  const view = validateView(searchParams[VIEW])
  const userId = validateUserId(params[USER_ID])

  const accessToken = cookies().get(ACCESS_TOKEN)?.value

  if (!accessToken) redirect('/')

  const artistsFirstPart = await getTopArtists(accessToken, {
    timeRange,
    userId,
    limit: 50,
  })
  const artistsSecondPart = await getTopArtists(accessToken, {
    timeRange,
    userId,
    limit: 50,
    offset: 49,
  })

  // Remove the first item of the second part to avoid duplicates
  artistsSecondPart.items.shift()
  const artists = artistsFirstPart.items.concat(artistsSecondPart.items)

  const headersList = headers()

  const header_url = headersList.get('x-url') ?? ''

  let routeName = ''

  if (header_url.split('/').length > 3)
    routeName = `-${header_url.split('/')[4]}`

  const urlParams = new URLSearchParams()

  const timeRangeCookie =
    (await getSettingsCookie(routeName, 'time-range')) ?? ''

  const viewCookie = (await getSettingsCookie(routeName, 'view')) ?? ''

  if (timeRangeCookie) urlParams.set('time-range', timeRangeCookie)

  if (viewCookie) urlParams.set('view', viewCookie)

  console.log(urlParams.toString())

  console.log(timeRangeCookie, viewCookie)

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
