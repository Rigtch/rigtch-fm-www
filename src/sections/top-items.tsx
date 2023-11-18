'use client'

import { DefaultSection } from './default'
import { ItemsSectionProps } from './items'

import { Separator } from '@components/ui/separator'
import { TopItemCard } from '@components/item/top-card'
import { Item } from '@components/item'

export function TopItemsSection({ title, items, children }: ItemsSectionProps) {
  const sortedItems = items.map((artist, index) => ({
    ...artist,
    position: index + 1,
  }))

  sortedItems.splice(0, 2, sortedItems[1], sortedItems[0])

  return (
    <DefaultSection title={title}>
      <div className="flex flex-col gap-8">
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

        <div className="flex flex-col gap-2">
          {sortedItems.slice(3).map((item, index) => (
            <div key={item.id}>
              <Item
                {...item}
                image={
                  'images' in item
                    ? item.images[0].url
                    : item.album.images[0].url
                }
              />

              {index !== items.length - 4 && <Separator />}
            </div>
          ))}
        </div>
      </div>

      {children}
    </DefaultSection>
  )
}
