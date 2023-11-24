'use client'

import { usePathname, useSearchParams } from 'next/navigation'

import { SelectView, ToggleTimeRange } from '@app/components/common'
import { LayoutProps } from '@app/types'
import { TIME_RANGE, VIEW } from '@app/constants'
import { validateTimeRange } from '@app/utils/time-range'
import { validateView } from '@app/utils/view'

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
