'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'

import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group'

import { TimeRange } from '@app/api/types'
import { formatSearchParams } from '@app/profile/utils/formatters'
import { createSettingsCookie } from '@app/utils/settings-cookies'
import { useRouteName } from '@app/hooks/use-route-name'
import { TIME_RANGE } from '@app/constants'

export interface ToggleTimeRangeProps {
  initialValue: TimeRange
}

export function ToggleTimeRange({ initialValue }: ToggleTimeRangeProps) {
  const timeRangeOptions = [
    { label: '4 weeks', value: TimeRange.SHORT_TERM },
    { label: '6 months', value: TimeRange.MEDIUM_TERM },
    { label: 'lifetime', value: TimeRange.LONG_TERM },
  ]

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const routeName = useRouteName()

  const saveTimeRangeToLocalStorage = async (value: TimeRange) => {
    await createSettingsCookie(routeName, value, 'time-range')

    console.log('done')
  }

  return (
    <ToggleGroup value={initialValue} type="single">
      {timeRangeOptions.map(({ label, value }) => (
        <ToggleGroupItem key={value} value={value} asChild>
          <Link
            href={`${pathname}?${formatSearchParams(
              searchParams,
              TIME_RANGE,
              value
            )}`}
            onClick={async () => {
              await saveTimeRangeToLocalStorage(value)
            }}
          >
            {label}
          </Link>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
