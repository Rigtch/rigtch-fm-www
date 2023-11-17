import { cookies } from 'next/headers'

import { ACCESS_TOKEN } from '@api/constants'
import { getTopGenres } from '@api/fetchers'
import { PageProps } from '@common/types'
import { TopGenresSection } from '@sections/profile'
import { getTimeRangeFromSearchParams } from '@utils/time-range'
import { SelectTimeRange } from '@components/common'

export default async function ProfileGenresPage({ searchParams }: PageProps) {
  const timeRange = getTimeRangeFromSearchParams(searchParams)

  const accessToken = cookies().get(ACCESS_TOKEN)?.value

  const genres = await getTopGenres(accessToken, timeRange)

  return (
    <>
      <div className="flex">
        <SelectTimeRange initialValue={timeRange} />
      </div>

      <TopGenresSection {...genres} />
    </>
  )
}
