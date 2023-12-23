import { cookies } from 'next/headers'

import { ProfileTopSectionProps } from '../types'

import { ACCESS_TOKEN } from '@app/api/constants'
import { getTopGenres } from '@app/api/fetchers'
import { validateTimeRange } from '@app/utils/time-range'
import { DefaultSection } from '@app/sections/default'
import { GenreChip } from '@app/components/common'
import { TIME_RANGE } from '@app/constants'
import { Skeleton } from '@app/components/ui/skeleton'

export async function ProfileTopGenresSection({
  searchParams,
  limit,
  children,
}: ProfileTopSectionProps) {
  const timeRange = validateTimeRange(searchParams[TIME_RANGE])

  const accessToken = cookies().get(ACCESS_TOKEN)?.value

  const { genres } = await getTopGenres(accessToken, timeRange, limit)

  return (
    <DefaultSection title="Top Genres" className="gap-12 items-center">
      <div className="flex flex-row flex-wrap gap-2">
        {genres.length > 0
          ? genres.map(genre => (
              <div key={genre}>
                <GenreChip genre={genre} />
              </div>
            ))
          : Array.from({ length: 10 }).map((_, index) => (
              <div key={index}>
                <Skeleton className="w-[8rem] h-[2rem] rounded-lg" />
              </div>
            ))}
      </div>

      {children && <div>{children}</div>}
    </DefaultSection>
  )
}
