import { cookies } from 'next/headers'

import { ACCESS_TOKEN } from '@api/constants'
import { getTopArtists } from '@api/fetchers'
import { PageProps } from '@common/types'
import { SelectTimeRange } from '@components/common'
import { TopArtistsSection } from '@sections/profile'
import { getTimeRangeFromSearchParams } from '@utils/time-range'

export default async function ProfileArtistsPage({ searchParams }: PageProps) {
  const timeRange = getTimeRangeFromSearchParams(searchParams)

  const accessToken = cookies().get(ACCESS_TOKEN)?.value

  const artists = await getTopArtists(accessToken, timeRange, 100)

  return (
    <>
      <div className="flex">
        <SelectTimeRange initialValue={timeRange} />
      </div>

      <TopArtistsSection artists={artists} />
    </>
  )
}
