'use client'

import { LuLayers, LuList } from 'react-icons/lu'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import type { ProfileSelectProps } from './props'

import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
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
        scroll: true,
      }
    )
  }

  return (
    <Select defaultValue={initialValue} onValueChange={handleOnValueChange}>
      <SelectTrigger className="min-w-[120px] text-white">
        <SelectValue placeholder="Select view" />
      </SelectTrigger>

      <SelectContent>
        {viewOptions.map(({ icon, value, label }) => (
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
