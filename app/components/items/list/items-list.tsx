'use client'

import type { HtmlHTMLAttributes } from 'react'

import { ItemTopCard } from '../cards'
import { formatItems } from '../helpers'
import type { ItemPosition } from '../misc'

import { ItemsListElement } from './items-list-element'

import type {
  AlbumEntity,
  ArtistEntity,
  RigtchStatsResponse,
  TrackEntity,
} from '@app/api/types'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@app/components/ui/carousel'
import { Separator } from '@app/components/ui/separator'
import { cn } from '@app/utils/cn'

namespace ItemsList {
  export type Props = Readonly<
    Pick<HtmlHTMLAttributes<HTMLDivElement>, 'className'> & {
      items:
        | ArtistEntity[]
        | TrackEntity[]
        | RigtchStatsResponse<ArtistEntity | TrackEntity | AlbumEntity>
      isTop?: boolean
      positionSize?: ItemPosition.Props['size']
      positionClassName?: string
      lastItemSeparator?: boolean
      isRounded?: boolean
      genresDisplayLength?: number
      hideImage?: boolean
      highlightedTrackId?: string
      prefetchItemsPages?: boolean
      linkScroll?: boolean
    }
  >
}

function ItemsList({
  items,
  isTop,
  positionSize,
  className,
  hideImage = false,
  positionClassName,
  lastItemSeparator = false,
  isRounded = false,
  genresDisplayLength = 3,
  highlightedTrackId,
  prefetchItemsPages,
  linkScroll,
}: ItemsList.Props) {
  const sortedItems: (ArtistEntity | TrackEntity | AlbumEntity)[] =
    formatItems(items)

  const carouselItems = sortedItems.slice(0, 3)

  if (isTop) sortedItems.splice(0, 2, sortedItems[1], sortedItems[0])

  return (
    <div className={cn('flex flex-col gap-8', className)}>
      {isTop && (
        <>
          <div className="mt-16 hidden w-full flex-col items-center justify-center gap-4 self-center pt-4 md:flex md:flex-row md:items-start lg:mt-24">
            <div className="flex h-full flex-col-reverse justify-center gap-4 md:w-2/3 md:flex-row">
              {sortedItems.slice(0, 2).map(item => (
                <ItemTopCard {...item} className="w-1/2" key={item.id} />
              ))}
            </div>

            <div className="h-full md:w-1/3">
              {sortedItems.slice(2, 3).map(item => (
                <ItemTopCard {...item} key={item.id} />
              ))}
            </div>
          </div>

          <Carousel className="max-w-full self-center sm:min-w-[500px] sm:max-w-[600px] md:hidden">
            <CarouselContent>
              {carouselItems.slice(0, 3).map(item => (
                <CarouselItem key={item.id}>
                  <ItemTopCard {...item} isCarousel />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </>
      )}

      <div className="flex flex-col">
        {sortedItems.slice(isTop ? 3 : 0).map((item, index, items) => (
          <div key={index}>
            {/* @ts-expect-error: conditional types are already handled */}
            <ItemsListElement
              {...item}
              isHighlighted={item.id == highlightedTrackId}
              hideImage={hideImage}
              genresDisplayLength={genresDisplayLength}
              positionSize={positionSize}
              positionClassName={positionClassName}
              prefetchItemsPage={prefetchItemsPages}
              linkScroll={linkScroll}
              className={cn(
                isRounded && index === 0 && 'rounded-t-lg',
                isRounded && index === items.length - 1 && 'rounded-bl-lg'
              )}
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

export { ItemsList }
