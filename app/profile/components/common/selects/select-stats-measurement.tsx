'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { LuHourglass, LuPlay } from 'react-icons/lu'

import type { ProfileSelectProps } from './props'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@app/components/ui/select'
import { STATS_MEASUREMENT } from '@app/profile/constants'
import { formatSearchParams } from '@app/utils/formatters'
import { StatsMeasurement } from '@app/api/enums'
import { TooltipInfo } from '@app/components/common'

export function SelectStatsMeasurement({
  initialValue,
}: ProfileSelectProps<StatsMeasurement>) {
  const statsMeasurementOptions = [
    {
      value: StatsMeasurement.PLAYS,
      label: 'Plays',
      icon: <LuPlay />,
    },
    {
      value: StatsMeasurement.PLAY_TIME,
      label: 'PlayTime',
      icon: <LuHourglass />,
    },
  ]

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  function handleOnValueChange(value: StatsMeasurement) {
    router.push(
      `${pathname}?${formatSearchParams(searchParams, STATS_MEASUREMENT, value)}`,
      {
        scroll: true,
      }
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <TooltipInfo title="Measurement">
        Stats measurement indicates how the statistics will be calculated.
      </TooltipInfo>

      <Select value={initialValue} onValueChange={handleOnValueChange}>
        <SelectTrigger className="min-w-[120px] text-white">
          <SelectValue placeholder="Select stats measurement" />
        </SelectTrigger>

        <SelectContent>
          {statsMeasurementOptions.map(({ value, label, icon }) => (
            <SelectItem key={value} value={value} className="flex gap-2">
              <div className="flex items-center gap-2">
                {icon}
                {label}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
