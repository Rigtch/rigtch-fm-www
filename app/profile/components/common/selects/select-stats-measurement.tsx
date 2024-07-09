'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { LuHourglass, LuPlay } from 'react-icons/lu'

import { StatsMeasurement } from '@app/api/types'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@app/components/ui/select'
import { STATS_MEASUREMENT } from '@app/profile/constants'
import { formatSearchParams } from '@app/utils/formatters'

export interface SelectStatsMeasurementProps {
  initialValue: StatsMeasurement
}

export function SelectStatsMeasurement({
  initialValue,
}: SelectStatsMeasurementProps) {
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
    <Select defaultValue={initialValue} onValueChange={handleOnValueChange}>
      <SelectTrigger className="min-w-[120px] text-white">
        <SelectValue placeholder="Select stats measurement" />
      </SelectTrigger>

      <SelectContent>
        {statsMeasurementOptions.map(({ value, label, icon }) => (
          <SelectItem key={value} value={value} className="flex gap-2">
            <div className="flex gap-2 items-center">
              {icon}
              {label}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
