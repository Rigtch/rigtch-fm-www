'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { LuClock } from 'react-icons/lu'

import type { ProfileSelectProps } from './props'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@app/components/ui/select'
import {
  SpotifyTimeRange,
  RigtchTimeRange,
  type StatsProvider,
} from '@app/profile/enums'
import { formatSearchParams } from '@app/utils/formatters'
import { TIME_RANGE } from '@app/profile/constants'
import { TooltipInfo } from '@app/components/common'

namespace SelectTimeRange {
  export type Props<TStatsProvider extends StatsProvider> = ProfileSelectProps<
    TStatsProvider extends StatsProvider.RIGTCH
      ? RigtchTimeRange
      : SpotifyTimeRange
  >
}

function SelectTimeRange<TStatsProvider extends StatsProvider>({
  initialValue,
}: SelectTimeRange.Props<TStatsProvider>) {
  const timeRangeOptions = Object.values(RigtchTimeRange).includes(
    initialValue as RigtchTimeRange
  )
    ? [
        {
          value: RigtchTimeRange.WEEK,
          label: '7 days',
        },
        {
          value: RigtchTimeRange.TWO_WEEKS,
          label: '14 days',
        },
        {
          value: RigtchTimeRange.MONTH,
          label: '30 days',
        },
        {
          value: RigtchTimeRange.THREE_MONTHS,
          label: '90 days',
        },
      ]
    : [
        { label: '4 weeks', value: SpotifyTimeRange.SHORT_TERM },
        { label: '6 months', value: SpotifyTimeRange.MEDIUM_TERM },
        { label: 'lifetime', value: SpotifyTimeRange.LONG_TERM },
      ]

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  function handleOnValueChange(value: RigtchTimeRange) {
    router.push(
      `${pathname}?${formatSearchParams(searchParams, TIME_RANGE, value)}`,
      {
        scroll: true,
      }
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <TooltipInfo title="Time range">
        The time range in which the statistics will be calculated.
      </TooltipInfo>

      <Select value={initialValue} onValueChange={handleOnValueChange}>
        <SelectTrigger className="min-w-[120px] text-white">
          <SelectValue placeholder="Select time range" />
        </SelectTrigger>

        <SelectContent>
          {timeRangeOptions.map(({ value, label }) => (
            <SelectItem key={value} value={value} className="flex gap-2">
              <div className="flex gap-2 items-center">
                <LuClock />
                {label}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export { SelectTimeRange }
