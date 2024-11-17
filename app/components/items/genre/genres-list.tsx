import { GenreChip } from './genre-chip'

import { cn } from '@app/utils/cn'
import type { RigtchStatsResponse } from '@app/api/types'

namespace GenresList {
  export type Props = Readonly<{
    items: string[] | RigtchStatsResponse<string>
    className?: string
  }>
}

function GenresList({ items, className }: GenresList.Props) {
  if (items.length === 0) return null

  return (
    <div className={cn('flex flex-row flex-wrap gap-2', className)}>
      {items.map(genre => (
        <div key={typeof genre === 'string' ? genre : genre.item}>
          <GenreChip
            genre={typeof genre === 'string' ? genre : genre.item}
            {...(typeof genre !== 'string' &&
            items.every(item => typeof item !== 'string')
              ? 'plays' in genre
                ? {
                    plays: genre.plays!,
                    maxPlays: Math.max(...items.map(item => item.plays!)),
                  }
                : {
                    playTime: genre.playTime,
                    maxPlayTime: Math.max(...items.map(item => item.playTime!)),
                  }
              : {})}
          />
        </div>
      ))}
    </div>
  )
}

export { GenresList }
