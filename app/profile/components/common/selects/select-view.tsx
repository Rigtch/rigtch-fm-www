'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { LuLayers, LuList } from 'react-icons/lu'

import type { ProfileSelectProps } from './props'

import { TooltipInfo } from '@app/components/common'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@app/components/ui/select'
import { View } from '@app/profile/enums'
import { formatSearchParams } from '@app/utils/formatters'

export function SelectView({ initialValue }: ProfileSelectProps<View>) {
  const viewOptions = [
    {
      icon: <LuLayers />,
      value: View.CARD,
      label: 'Card',
    },
    {
      icon: <LuList />,
      value: View.LIST,
      label: 'List',
    },
  ]

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  function handleOnValueChange(value: View) {
    router.push(
      `${pathname}?${formatSearchParams(searchParams, 'view', value)}`,
      {
        scroll: false,
      }
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <TooltipInfo title="View">
        View indicates how the statistics will be displayed.
      </TooltipInfo>

      <Select
        value={initialValue}
        onValueChange={handleOnValueChange}
        onOpenChange={() => {
          for (const { value } of viewOptions) {
            router.prefetch(
              `${pathname}?${formatSearchParams(searchParams, 'view', value)}`
            )
          }
        }}
      >
        <SelectTrigger className="min-w-[120px] text-white">
          <SelectValue placeholder="Select view" />
        </SelectTrigger>

        <SelectContent>
          {viewOptions.map(({ icon, value, label }) => (
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
