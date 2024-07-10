'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'

import { ToggleGroup, ToggleGroupItem } from '@app/components/ui/toggle-group'
import { SpotifyTimeRange } from '@app/profile/enums'
import { formatSearchParams } from '@app/utils/formatters'

export interface ToggleTimeRangeProps {
  initialValue: SpotifyTimeRange
}

export function ToggleTimeRange({ initialValue }: ToggleTimeRangeProps) {
  const timeRangeOptions = [
    { label: '4 weeks', value: SpotifyTimeRange.SHORT_TERM },
    { label: '6 months', value: SpotifyTimeRange.MEDIUM_TERM },
    { label: 'lifetime', value: SpotifyTimeRange.LONG_TERM },
  ]

  const pathname = usePathname()
  const searchParams = useSearchParams()

  return (
    <ToggleGroup value={initialValue} type="single" className="text-white">
      {timeRangeOptions.map(({ label, value }) => (
        <ToggleGroupItem key={value} value={value} asChild>
          <Link
            href={`${pathname}?${formatSearchParams(
              searchParams,
              'time-range',
              value
            )}`}
          >
            {label}
          </Link>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}
