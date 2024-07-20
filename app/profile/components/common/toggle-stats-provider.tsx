'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'

import type { ProfileSelectProps } from './selects/props'

import { ToggleGroup, ToggleGroupItem } from '@app/components/ui/toggle-group'
import { formatSearchParams } from '@app/utils/formatters'
import { STATS_PROVIDER, VIEW } from '@app/profile/constants'
import { StatsProvider } from '@app/profile/enums'
import { TooltipInfo } from '@app/components/common'

export function ToggleStatsProvider({
  initialValue,
}: ProfileSelectProps<StatsProvider>) {
  const statsProviderOptions = [
    {
      value: StatsProvider.SPOTIFY,
      label: 'Spotify',
    },
    {
      value: StatsProvider.RIGTCH,
      label: 'rigtch.fm',
    },
  ]

  const pathname = usePathname()
  const searchParams = useSearchParams()

  const view = searchParams.get(VIEW)

  return (
    <div className="flex flex-col gap-2">
      <TooltipInfo title="Stats provider">
        Stats provider is the source of the data that will be used to display
        the statistics.
      </TooltipInfo>

      <ToggleGroup
        value={initialValue}
        type="single"
        className="text-white justify-start"
      >
        {statsProviderOptions.map(({ value, label }) => (
          <ToggleGroupItem key={value} value={value} asChild>
            <Link
              href={`${pathname}?${formatSearchParams(
                new URLSearchParams(
                  view
                    ? {
                        [VIEW]: view,
                      }
                    : undefined
                ),
                STATS_PROVIDER,
                value
              )}`}
            >
              {label}
            </Link>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  )
}
