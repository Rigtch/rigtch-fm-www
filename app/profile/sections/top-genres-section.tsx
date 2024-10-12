import { NoDataAlert } from '../components/common'

import { TotalItemsListened } from './total-items-listened'

import type { RigtchStatsResponse } from '@app/api/types'
import { GenreChip } from '@app/components/items/genre'
import { DefaultSection } from '@app/sections'

namespace TopGenresSection {
  export type Props = Pick<DefaultSection.Props, 'children'> & {
    items: string[] | RigtchStatsResponse<string>
    total?: number
  }
}

function TopGenresSection({ items, total, children }: TopGenresSection.Props) {
  return (
    <DefaultSection
      title="Top Genres"
      className="gap-4"
      headerAction={
        total && <TotalItemsListened total={total} itemType="genre" />
      }
    >
      {items.length > 0 && (
        <div className="flex flex-row flex-wrap gap-2">
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
                        maxPlayTime: Math.max(
                          ...items.map(item => item.playTime!)
                        ),
                      }
                  : {})}
              />
            </div>
          ))}
        </div>
      )}

      {items.length === 0 && <NoDataAlert />}

      <div className="flex justify-center">{children}</div>
    </DefaultSection>
  )
}

export { TopGenresSection }
