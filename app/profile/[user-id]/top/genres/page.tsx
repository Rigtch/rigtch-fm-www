import { redirect } from 'next/navigation'
import { cookies, headers } from 'next/headers'

import { TIME_RANGE, USER_ID } from '@app/constants'
import { validateTimeRange } from '@app/profile/utils/time-range'
import { GenreChip, ToggleTimeRange } from '@app/components/common'
import { getTopGenres } from '@app/api/fetchers'
import { DefaultSection } from '@app/sections'
import { ACCESS_TOKEN } from '@app/api/constants'
import { ProfilePageProps } from '@app/profile/types'
import { validateUserId } from '@app/profile/utils/user-id'
import { getSettingsCookie } from '@app/utils/settings-cookies'

export const runtime = 'edge'

export default async function ProfileTopGenresPage({
  searchParams,
  params,
}: ProfilePageProps) {
  const timeRange = validateTimeRange(searchParams[TIME_RANGE])
  const userId = validateUserId(params[USER_ID])
  const accessToken = cookies().get(ACCESS_TOKEN)?.value

  if (!accessToken) redirect('/')

  const { genres } = await getTopGenres(accessToken, {
    limit: 50,
    timeRange,
    userId,
  })

  const headersList = headers()

  const header_url = headersList.get('x-url') ?? ''

  let routeName = ''

  if (header_url.split('/').length > 3)
    routeName = `-${header_url.split('/')[4]}`

  const urlParams = new URLSearchParams()

  const timeRangeCookie =
    (await getSettingsCookie(routeName, 'time-range')) ?? ''

  if (timeRangeCookie) urlParams.set('time-range', timeRangeCookie)

  console.log(urlParams.toString())

  console.log(timeRangeCookie)

  return (
    <>
      <div className="flex justify-between flex-col md:flex-row gap-4 items-stretch md:items-center">
        <ToggleTimeRange initialValue={timeRange} />
      </div>

      <DefaultSection title="Top Genres" className="gap-12 items-center">
        <div className="flex flex-row flex-wrap gap-2">
          {genres.map(genre => (
            <div key={genre}>
              <GenreChip genre={genre} />
            </div>
          ))}
        </div>
      </DefaultSection>
    </>
  )
}
