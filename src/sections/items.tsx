import { DefaultSection, DefaultSectionProps } from './default'

import { Item } from '@components/item'
import { Artist, Track } from '@api/types'
import { Separator } from '@components/ui/separator'

export type ItemsSectionProps = DefaultSectionProps &
  (
    | {
        items: Artist[]
      }
    | {
        items: Track[]
      }
  )

export function ItemsSection({ items, title, children }: ItemsSectionProps) {
  return (
    <DefaultSection title={title}>
      <div className="flex flex-col justify-center gap-5">
        <div className="flex flex-col gap-2">
          {items.map((item, index) => (
            <div key={item.id}>
              <Item
                {...item}
                image={
                  'images' in item
                    ? item.images[0].url
                    : item.album.images[0].url
                }
              />

              {index !== items.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      </div>

      {children}
    </DefaultSection>
  )
}
