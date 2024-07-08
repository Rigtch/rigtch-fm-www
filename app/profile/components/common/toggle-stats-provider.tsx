'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'

import { ToggleGroup, ToggleGroupItem } from '@app/components/ui/toggle-group'
import { formatSearchParams } from '@app/profile/utils/formatters'
import { STATS_PROVIDER, VIEW } from '@app/constants'
import { StatsProvider } from '@app/profile/types'

export interface ToggleStatsProviderProps {
  initialValue: StatsProvider
}

export function ToggleStatsProvider({
  initialValue,
}: ToggleStatsProviderProps) {
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
    <ToggleGroup value={initialValue} type="single" className="text-white">
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
  )
}
