import { cookies } from 'next/headers'

import { ACCESS_TOKEN } from '@app/api/constants'
import { getTopGenres } from '@app/api/fetchers'
import { PageProps } from '@app/types'
import { getTimeRangeFromSearchParams } from '@app/utils/time-range'
import { DefaultSection } from '@app/sections/default'
import { GenreChip } from '@app/components/common'

export default async function ProfileTopGenresPage({
  searchParams,
}: PageProps) {
  const timeRange = getTimeRangeFromSearchParams(searchParams)

  const accessToken = cookies().get(ACCESS_TOKEN)?.value

  const { genres } = await getTopGenres(accessToken, timeRange)

  return (
    <>
      <DefaultSection title="Top Genres">
        <div className="flex flex-row flex-wrap gap-2">
          {genres?.map(genre => (
            <div key={genre}>
              <GenreChip genre={genre} />
            </div>
          ))}
        </div>
      </DefaultSection>
    </>
  )
}
