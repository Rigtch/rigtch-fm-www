import { cookies } from 'next/headers'

import { ProfileTopSectionProps } from '../types'

import { ACCESS_TOKEN } from '@app/api/constants'
import { getTopGenres } from '@app/api/fetchers'
import { validateTimeRange } from '@app/utils/time-range'
import { DefaultSection } from '@app/sections/default'
import { GenreChip } from '@app/components/common'
import { TIME_RANGE } from '@app/constants'

export async function ProfileTopGenresSection({
  searchParams,
}: ProfileTopSectionProps) {
  const timeRange = validateTimeRange(searchParams[TIME_RANGE])

  const accessToken = cookies().get(ACCESS_TOKEN)?.value

  const { genres } = await getTopGenres(accessToken, timeRange)

  return (
    <DefaultSection title="Top Genres">
      <div className="flex flex-row flex-wrap gap-2">
        {genres.map(genre => (
          <div key={genre}>
            <GenreChip genre={genre} />
          </div>
        ))}
      </div>
    </DefaultSection>
  )
}
