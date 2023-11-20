'use client'

import { usePathname, useSearchParams } from 'next/navigation'

import { validateTimeRange } from '@utils/time-range'
import { SelectView, ToggleTimeRange } from '@components/common'
import { LayoutProps } from '@common/types'
import { TIME_RANGE, VIEW } from '@common/constants'
import { validateView } from '@utils/view'

export default function ProfileTemplate({ children }: LayoutProps) {
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const timeRange = validateTimeRange(searchParams.get(TIME_RANGE))
  const view = validateView(searchParams.get(VIEW))

  return (
    <>
      <div className="flex justify-between">
        <ToggleTimeRange initialValue={timeRange} />

        {pathname !== '/profile/top/genres' && (
          <div>
            <SelectView initialValue={view} />
          </div>
        )}
      </div>

      {children}
    </>
  )
}
