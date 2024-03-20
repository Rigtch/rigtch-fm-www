'use client'

import { useSearchParams } from 'next/navigation'
import { ReactNode } from 'react'

import { TIME_RANGE, VIEW } from '@app/constants'
import { validateTimeRange } from '@app/profile/utils/time-range'
import { validateView } from '@app/profile/utils/view'
import { ToggleTimeRange, SelectView } from '@app/components/common'
import { ProfileLayoutBaseProps } from '@app/profile/types'

export interface ProfileTopGenresSubLayoutProps extends ProfileLayoutBaseProps {
  genres: ReactNode
  artists: ReactNode
  tracks: ReactNode
}

export default function ProfileTopGenresSubLayout({
  genres,
  artists,
  tracks,
}: ProfileTopGenresSubLayoutProps) {
  const searchParams = useSearchParams()
  const timeRange = validateTimeRange(searchParams.get(TIME_RANGE))
  const view = validateView(searchParams.get(VIEW))

  return (
    <>
      <div className="flex justify-between flex-col md:flex-row gap-4 items-stretch md:items-center">
        <ToggleTimeRange initialValue={timeRange} />

        <div>
          <SelectView initialValue={view} />
        </div>
      </div>

      {genres}
      {artists}
      {tracks}
    </>
  )
}
