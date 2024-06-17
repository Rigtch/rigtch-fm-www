'use client'

import { ItemTopCard } from '../item-top-card'
import type { ItemPositionProps } from '../item-position'

import { ItemsListElement } from './items-list-element'

import type { ArtistEntity, TrackEntity } from '@app/api/types'
import { Separator } from '@app/components/ui/separator'

export interface ItemsListProps {
  items: ArtistEntity[] | TrackEntity[]
  isTop?: boolean
  positionSize?: ItemPositionProps['size']
  positionClassName?: string
  lastItemSeparator?: boolean
}

export function ItemsList({
  items,
  isTop,
  positionSize,
  positionClassName,
  lastItemSeparator = false,
}: ItemsListProps) {
  const sortedItems = items.map((artist, index) => ({
    ...artist,
    ...(!('playedAt' in items[0]) && {
      position: index + 1,
    }),
  }))

  console.log('playedAt' in items[0])

  isTop && sortedItems.splice(0, 2, sortedItems[1], sortedItems[0])

  return (
    <div className="flex flex-col gap-8">
      {isTop && (
        <div className="flex flex-col md:flex-row self-center items-center md:items-start justify-center gap-4 pt-4 mt-16 lg:mt-24 w-full">
          <div className="flex flex-col-reverse md:flex-row justify-center gap-4 md:w-2/3 h-full">
            {sortedItems.slice(0, 2).map(item => (
              <ItemTopCard {...item} key={item.id} />
            ))}
          </div>

          <div className="md:w-1/3 h-full">
            {sortedItems.slice(2, 3).map(item => (
              <ItemTopCard {...item} key={item.id} />
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        {sortedItems.slice(isTop ? 3 : 0).map((item, index, items) => (
          <div key={index}>
            {/* @ts-expect-error: conditional types are already handled */}
            <ItemsListElement
              {...item}
              positionSize={positionSize}
              positionClassName={positionClassName}
            />

            {items.length === index + 1 ? (
              lastItemSeparator ? (
                <Separator />
              ) : null
            ) : (
              <Separator />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
