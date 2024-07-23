'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'

import type { ProfileSelectProps } from './selects/props'
import { isTimeRangeDisabled } from './utils'

import { ToggleGroup, ToggleGroupItem } from '@app/components/ui/toggle-group'
import { formatSearchParams } from '@app/utils/formatters'
import { STATS_PROVIDER, VIEW } from '@app/profile/constants'
import { RigtchTimeRange, StatsProvider } from '@app/profile/enums'
import { TooltipInfo } from '@app/components/common'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@app/components/ui/tooltip'

namespace ToggleStatsProvider {
  export interface Props extends ProfileSelectProps<StatsProvider> {
    userCreatedAt?: Date
    /**
     * If true, the user considered as a beta user will be ignored and the time range will be disabled anyway.
     * !!! This should be used only for creating stories.
     */
    ignoreBetaUser?: boolean
  }
}

function ToggleStatsProvider({
  initialValue,
  userCreatedAt,
  ignoreBetaUser,
}: ToggleStatsProvider.Props) {
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

  const isDisabled = isTimeRangeDisabled(
    RigtchTimeRange.WEEK,
    userCreatedAt,
    ignoreBetaUser
  )

  return (
    <div className="flex flex-col gap-2">
      <TooltipInfo title="Stats provider">
        Stats provider is the source of the data that will be used to display
        the statistics.
      </TooltipInfo>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <ToggleGroup
              value={initialValue}
              type="single"
              className="text-white justify-start"
              disabled={isDisabled}
            >
              {statsProviderOptions.map(({ value, label }) => (
                <ToggleGroupItem
                  key={value}
                  value={value}
                  asChild
                  disabled={isDisabled}
                >
                  <Link
                    aria-disabled={isDisabled}
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
          </TooltipTrigger>

          {isDisabled && (
            <TooltipContent>
              Your account have to exist for more than 7 days to use rigtch.fm
              generated statistics.
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

export { ToggleStatsProvider }
