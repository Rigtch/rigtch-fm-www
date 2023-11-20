'use client'

import { useSearchParams } from 'next/navigation'

import { validateTimeRange } from '@utils/time-range'
import { ToggleTimeRange } from '@components/common'
import { LayoutProps } from '@common/types'
import { TIME_RANGE } from '@common/constants'

export default function ProfileTemplate({ children }: LayoutProps) {
  const searchParams = useSearchParams()

  const timeRange = validateTimeRange(searchParams.get(TIME_RANGE))

  return (
    <>
      <div className="flex">
        <ToggleTimeRange initialValue={timeRange} />
      </div>

      {children}
    </>
  )
}
