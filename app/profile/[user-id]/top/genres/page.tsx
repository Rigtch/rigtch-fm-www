import { redirect } from 'next/navigation'

import { validateId } from '@app/utils/validate-id'
import { TIME_RANGE, USER_ID } from '@app/constants'
import { validateTimeRange } from '@app/profile/utils/time-range'
import { GenreChip, ToggleTimeRange } from '@app/components/common'
import { getTopGenres } from '@app/api/fetchers'
import { DefaultSection } from '@app/sections'
import { ProfilePageProps } from '@app/profile/types'
import { getServerToken } from '@app/api/auth'

export const runtime = 'edge'

export default async function ProfileTopGenresPage({
  searchParams,
  params,
}: ProfilePageProps) {
  const timeRange = validateTimeRange(searchParams[TIME_RANGE])
  const userId = validateId(params[USER_ID])
  const token = await getServerToken()

  if (!token) redirect('/')

  const { genres } = await getTopGenres(token, {
    limit: 50,
    timeRange,
    userId,
  })

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
