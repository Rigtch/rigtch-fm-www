'use client'

import prettyMilliseconds from 'pretty-ms'
import { useEffect, useState } from 'react'

import type { PlayTimeOrPlays } from '../props'

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
            plays ?? playTime ? 'cursor-pointer' : 'cursor-default'
          )}
        >
          <div
            className={cn(
              'relative overflow-hidden rounded-xl w-max -z-10',
              className ?? 'bg-neutral-700'
            )}
          >
            {(plays ?? playTime) && (
              <div
                className="transition-all duration-700 ease-in-out -z-10 absolute bg-primary h-full -skew-x-12 -left-[8px]"
                style={{
                  width: `calc(${progressWidth}% + 10px)`,
                }}
              />
            )}

            <div className={cn('p-2 whitespace-nowrap text-white block')}>
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
