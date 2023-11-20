'use client'

import { Item, TopItemCard } from '.'

import { Artist, Track } from '@api/types'
import { Separator } from '@components/ui/separator'

export interface ItemsListProps {
  items: (Artist | Track)[]
  isTop?: boolean
}

export function ItemsList({ items, isTop }: ItemsListProps) {
  const sortedItems = items.map((artist, index) => ({
    ...artist,
    position: index + 1,
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
                image={
                  'images' in item
                    ? item.images[0].url
                    : item.album.images[0].url
                }
                key={item.id}
              />
            ))}
          </div>

          <div className="md:w-1/3 h-full">
            {sortedItems.slice(2, 3).map(item => (
              <TopItemCard
                {...item}
                image={
                  'images' in item
                    ? item.images[0].url
                    : item.album.images[0].url
                }
                key={item.id}
              />
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        {sortedItems.slice(isTop ? 3 : 0).map((item, index) => (
          <div key={item.id}>
            <Item
              {...item}
              image={
                'images' in item ? item.images[0].url : item.album.images[0].url
              }
            />

            {index !== items.length - (isTop ? 4 : 1) && <Separator />}
          </div>
        ))}
      </div>
    </div>
  )
}
