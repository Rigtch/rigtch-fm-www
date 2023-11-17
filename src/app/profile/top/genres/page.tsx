import { cookies } from 'next/headers'

import { ACCESS_TOKEN } from '@api/constants'
import { getTopGenres } from '@api/fetchers'
import { PageProps } from '@common/types'
import { TopGenresSection } from '@sections/profile'
import { getTimeRangeFromSearchParams } from '@utils/time-range'

export default async function ProfileTopGenresPage({
  searchParams,
}: PageProps) {
  const timeRange = getTimeRangeFromSearchParams(searchParams)

  const accessToken = cookies().get(ACCESS_TOKEN)?.value

  const genres = await getTopGenres(accessToken, timeRange)

  return (
    <>
      <TopGenresSection {...genres} />
    </>
  )
}
