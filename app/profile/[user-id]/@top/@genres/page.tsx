import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

import { ProfilePageProps } from '@app/profile/types'
import { TIME_RANGE, USER_ID } from '@app/constants'
import { ACCESS_TOKEN } from '@app/api/constants'
import { validateTimeRange } from '@app/profile/utils/time-range'
import { GenreChip, SeeMoreButton } from '@app/components/common'
import { DefaultSection } from '@app/sections'
import { getTopGenres } from '@app/api/fetchers'
import { validateUserId } from '@app/profile/utils/user-id'

export default async function ProfileTopGenresSubPage({
  searchParams,
  params,
}: ProfilePageProps) {
  const timeRange = validateTimeRange(searchParams[TIME_RANGE])
  const userId = validateUserId(params[USER_ID])
  const accessToken = cookies().get(ACCESS_TOKEN)?.value

  if (!accessToken) redirect('/')

  const { genres } = await getTopGenres(accessToken, {
    limit: 10,
    timeRange,
    userId,
  })

  return (
    <DefaultSection title="Top Genres" className="gap-12">
      <div className="flex flex-row flex-wrap gap-2">
        {genres.map(genre => (
          <div key={genre}>
            <GenreChip genre={genre} />
          </div>
        ))}
      </div>

      <SeeMoreButton href={`/profile/${userId}/top/genres`} />
    </DefaultSection>
  )
}
