'use server'

import { redirect } from 'next/navigation'

import { validateId } from '@app/utils/validate-id'
import type { ProfilePageProps } from '@app/profile/types'
import { TIME_RANGE, USER_ID } from '@app/constants'
import { validateTimeRange } from '@app/profile/utils/time-range'
import { SeeMoreButton } from '@app/components/common/buttons'
import { getTopGenres } from '@app/api/fetchers'
import { getServerToken } from '@app/auth/utils'
import { TopGenresSection } from '@app/profile/sections'

export default async function ProfileTopGenresSubPage({
  searchParams,
  params,
}: ProfilePageProps) {
  const timeRange = validateTimeRange(searchParams[TIME_RANGE])
  const userId = validateId(params[USER_ID])
  const token = await getServerToken()

  if (!token) redirect('/')

  const { genres } = await getTopGenres(token, {
    limit: 10,
    timeRange,
    userId,
  })

  return (
    <TopGenresSection items={genres}>
      <SeeMoreButton href={`/profile/${userId}/top/genres`} />
    </TopGenresSection>
  )
}
