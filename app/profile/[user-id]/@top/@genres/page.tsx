import { notFound, redirect } from 'next/navigation'
import { cookies } from 'next/headers'

import { ProfilePageProps } from '@app/profile/types'
import { TIME_RANGE, USER_ID } from '@app/constants'
import { ACCESS_TOKEN } from '@app/api/constants'
import { validateTimeRange } from '@app/utils/time-range'
import { GenreChip, SeeMoreButton } from '@app/components/common'
import { DefaultSection } from '@app/sections'
import { getTopGenres } from '@app/api/fetchers'

export default async function ProfileTopGenresSubPage({
  searchParams,
  params,
}: ProfilePageProps) {
  const timeRange = validateTimeRange(searchParams[TIME_RANGE])
  const userId = params[USER_ID]?.toString()
  const accessToken = cookies().get(ACCESS_TOKEN)?.value

  if (!userId) return notFound()
  if (!accessToken) redirect('/')

  const { genres } = await getTopGenres(accessToken, {
    limit: 10,
    timeRange,
    userId,
  })

  return (
    <DefaultSection title="Top Genres" className="gap-12 items-center">
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
