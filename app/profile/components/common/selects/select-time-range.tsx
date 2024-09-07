'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { LuClock } from 'react-icons/lu'

import type { ProfileSelectProps } from './props'

import { isTimeRangeDisabled } from '@app/profile/utils/helpers'
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
  export interface Props<TStatsProvider extends StatsProvider>
    extends ProfileSelectProps<
      TStatsProvider extends StatsProvider.RIGTCH
        ? RigtchTimeRange
        : SpotifyTimeRange
    > {
    userCreatedAt?: Date
    /**
     * If true, the user considered as a beta user will be ignored and the time range will be disabled anyway.
     * !!! This should be used only for creating stories.
     */
    ignoreBetaUser?: boolean
  }
}

function SelectTimeRange<TStatsProvider extends StatsProvider>({
  initialValue,
  userCreatedAt,
  ignoreBetaUser,
}: SelectTimeRange.Props<TStatsProvider>) {
  const isRigtchTimeRange =
    Object.values(RigtchTimeRange).includes(initialValue)

  const timeRangeOptions = isRigtchTimeRange
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

  function isValueDisabled(value: RigtchTimeRange | SpotifyTimeRange) {
    return isTimeRangeDisabled(value, userCreatedAt, ignoreBetaUser)
  }

  return (
    <div className="flex flex-col gap-2">
      <TooltipInfo title="Time range">
        The time range in which the statistics will be calculated.
      </TooltipInfo>

      <Select
        value={initialValue}
        onValueChange={handleOnValueChange}
        disabled={isRigtchTimeRange && isValueDisabled(RigtchTimeRange.WEEK)}
      >
        <SelectTrigger className="min-w-[120px] text-white">
          <SelectValue placeholder="Select time range" />
        </SelectTrigger>

        <SelectContent>
          {timeRangeOptions.map(({ value, label }) => (
            <SelectItem
              key={value}
              value={value}
              disabled={isValueDisabled(value)}
              className="flex gap-2"
            >
              <div className="flex items-center gap-2">
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
