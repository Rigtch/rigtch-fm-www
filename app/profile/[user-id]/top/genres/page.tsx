import { notFound } from 'next/navigation'

import { PageProps } from '@app/types'
import { ProfileSection, ProfileTopGenresSection } from '@app/profile/sections'
import { TIME_RANGE, USER_ID } from '@app/constants'
import { validateTimeRange } from '@app/utils/time-range'
import { ToggleTimeRange } from '@app/components/common'

export default function ProfileTopGenresPage({
  searchParams,
  params,
}: PageProps) {
  const timeRange = validateTimeRange(searchParams[TIME_RANGE])
  const userId = params?.[USER_ID]?.toString()

  if (!userId) return notFound()

  return (
    <>
      <ProfileSection userId={userId} />

      <div className="flex justify-between flex-col md:flex-row gap-4 items-stretch md:items-center">
        <ToggleTimeRange initialValue={timeRange} />
      </div>

      <ProfileTopGenresSection
        searchParams={searchParams}
        userId={userId}
        limit={50}
      />
    </>
  )
}
