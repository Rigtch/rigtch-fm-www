import { cookies } from 'next/headers'

import { ProfileTopSectionProps } from '../types'

import { TopItemsSection } from './top-items'

import { ACCESS_TOKEN } from '@app/api/constants'
import { getTopArtists } from '@app/api/fetchers'
import { validateTimeRange } from '@app/utils/time-range'
import { validateView } from '@app/utils/view'
import { TIME_RANGE, VIEW } from '@app/constants'

export async function ProfileTopArtistsSection({
  searchParams,
  limit,
  children,
}: ProfileTopSectionProps) {
  const timeRange = validateTimeRange(searchParams[TIME_RANGE])
  const view = validateView(searchParams[VIEW])

  const accessToken = cookies().get(ACCESS_TOKEN)?.value

  const artists = await getTopArtists(accessToken, timeRange, limit)

  return (
    <TopItemsSection items={artists.items} title="Top Artists" view={view}>
      {children && <div className="flex justify-center">{children}</div>}
    </TopItemsSection>
  )
}
