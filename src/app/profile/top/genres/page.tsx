import { cookies } from 'next/headers'

import { ACCESS_TOKEN } from '@api/constants'
import { getTopGenres } from '@api/fetchers'
import { PageProps } from '@common/types'
import { getTimeRangeFromSearchParams } from '@utils/time-range'
import { DefaultSection } from '@sections/default'
import { GenreChip } from '@components/common'

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
