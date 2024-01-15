import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'

import { ProfileTopSectionProps } from '../types'

import { ACCESS_TOKEN } from '@app/api/constants'
import { getTopGenres } from '@app/api/fetchers'
import { validateTimeRange } from '@app/utils/time-range'
import { DefaultSection } from '@app/sections/default'
import { GenreChip } from '@app/components/common'
import { TIME_RANGE } from '@app/constants'

export async function ProfileTopGenresSection({
  searchParams,
  userId,
  limit,
  children,
}: ProfileTopSectionProps) {
  const timeRange = validateTimeRange(searchParams[TIME_RANGE])

  const accessToken = cookies().get(ACCESS_TOKEN)?.value

  if (!userId) return notFound()
  if (!accessToken) redirect('/')

  const { genres } = await getTopGenres(accessToken, {
    limit,
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

      {children && <div>{children}</div>}
    </DefaultSection>
  )
}
