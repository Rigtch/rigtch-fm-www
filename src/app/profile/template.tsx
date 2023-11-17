'use client'

import '../audio-bars.css'

import { useSearchParams } from 'next/navigation'

import { validateTimeRange } from '@utils/time-range'
import { SelectTimeRange } from '@components/common'
import { LayoutProps } from '@common/types'
import { TIME_RANGE } from '@common/constants'

export default function ProfileTemplate({ children }: LayoutProps) {
  const searchParams = useSearchParams()

  const timeRange = validateTimeRange(searchParams.get(TIME_RANGE))

  return (
    <>
      <div className="flex">
        <SelectTimeRange initialValue={timeRange} />
      </div>

      {children}
    </>
  )
}
