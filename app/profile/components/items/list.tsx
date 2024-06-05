'use client'

import { TopItemCard } from './top-card'
import { Item } from './item'

import { Separator } from '@app/components/ui/separator'
import { ArtistEntity, TrackEntity } from '@app/api/types'
import { getImage } from '@app/utils/get-image'

export interface ItemsListProps {
  items: (ArtistEntity | TrackEntity)[]
  isTop?: boolean
  withoutPosition?: boolean
}

export function ItemsList({ items, isTop, withoutPosition }: ItemsListProps) {
  const sortedItems = items.map((artist, index) => ({
    ...artist,
    ...(!withoutPosition && {
      position: index + 1,
    }),
  }))

  isTop && sortedItems.splice(0, 2, sortedItems[1], sortedItems[0])

  return (
    <div className="flex flex-col gap-8">
      {isTop && (
        <div className="flex flex-col md:flex-row self-center items-center md:items-start justify-center gap-4 pt-4 mt-16 lg:mt-24 w-full">
          <div className="flex flex-col-reverse md:flex-row justify-center gap-4 md:w-2/3 h-full">
            {sortedItems.slice(0, 2).map(item => (
              <TopItemCard
                {...item}
                image={getImage(item, 164)}
                key={item.id}
              />
            ))}
          </div>

          <div className="md:w-1/3 h-full">
            {sortedItems.slice(2, 3).map(item => (
              <TopItemCard
                {...item}
                image={getImage(item, 164)}
                key={item.id}
              />
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        {sortedItems.slice(isTop ? 3 : 0).map((item, index) => (
          <div key={index}>
            <Item {...item} image={getImage(item, 48)} />

            <Separator />
          </div>
        ))}
      </div>
    </div>
  )
}
