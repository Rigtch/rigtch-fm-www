'use client'

import prettyMilliseconds from 'pretty-ms'
import { useEffect, useState } from 'react'

import type { PlayTimeOrPlays } from '../types'

import type { GenreProps } from './props'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@app/components/ui/tooltip'
import { cn } from '@app/utils/cn'

namespace GenreChip {
  export type Props = GenreProps & PlayTimeOrPlays
}

function GenreChip({
  genre,
  className,
  plays,
  maxPlays,
  playTime,
  maxPlayTime,
}: GenreChip.Props) {
  const [progressWidth, setProgressWidth] = useState<number>(0)

  useEffect(() => {
    if (plays ?? playTime) {
      setTimeout(() => {
        setProgressWidth(
          ((plays ?? playTime) / (maxPlays ?? maxPlayTime)) * 100
        )
      }, 200)
    }
  }, [plays, playTime, maxPlays, maxPlayTime])

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          className={cn(
            'w-full',
            (plays ?? playTime) ? 'cursor-pointer' : 'cursor-default'
          )}
        >
          <div
            className={cn(
              'relative -z-10 w-full overflow-hidden rounded-xl',
              className ?? 'bg-primary'
            )}
          >
            {(plays ?? playTime) && (
              <div
                className="absolute -left-[8px] -z-10 h-full -skew-x-12 bg-neutral-700 transition-all duration-700 ease-in-out"
                style={{
                  width: `calc(${progressWidth}% + 10px)`,
                }}
              />
            )}

            <div
              className={cn(
                'block whitespace-nowrap p-2 text-primary-foreground/80'
              )}
            >
              {genre}
            </div>
          </div>
        </TooltipTrigger>

        {plays && <TooltipContent>{plays} plays</TooltipContent>}
        {playTime && (
          <TooltipContent>{prettyMilliseconds(playTime)}</TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  )
}

export { GenreChip }
