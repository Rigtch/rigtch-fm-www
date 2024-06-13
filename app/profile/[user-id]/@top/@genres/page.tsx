'use server'

import { redirect } from 'next/navigation'

import { validateId } from '@app/utils/validate-id'
import { ProfilePageProps } from '@app/profile/types'
import { TIME_RANGE, USER_ID } from '@app/constants'
import { validateTimeRange } from '@app/profile/utils/time-range'
import { SeeMoreButton } from '@app/components/common/buttons'
import { DefaultSection } from '@app/sections'
import { getTopGenres } from '@app/api/fetchers'
import { getServerToken } from '@app/auth/utils'
import { GenreChip } from '@app/components/items'

export default async function ProfileTopGenresSubPage({
  searchParams,
  params,
}: ProfilePageProps) {
  const timeRange = validateTimeRange(searchParams[TIME_RANGE])
  const userId = validateId(params[USER_ID])
  const token = await getServerToken()

  if (!token) redirect('/')

  const { genres } = await getTopGenres(token, {
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
