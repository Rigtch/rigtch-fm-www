import { HTMLAttributes, ReactNode, useEffect } from 'react'

import { Artist, TimeRange } from '@api/types'
import {
  TopOneElementCard,
  ElementCard,
  ElementCardSize,
} from '@components/element'
import { SelectTimeRange } from '@components/select-time-range'

export interface TopArtistsViewProps extends HTMLAttributes<HTMLDivElement> {
  timeRange: TimeRange
  setTimeRange: (timeRange: TimeRange) => void
  items: Artist[]
  moreItems?: ReactNode
  skeleton?: boolean
}

export function TopArtistsView({
  timeRange,
  setTimeRange,
  items,
  moreItems,
  children,
  skeleton,
}: TopArtistsViewProps) {
  useEffect(() => {
    console.log('skeleton', skeleton)
  })

  return (
    <section className="flex-column flex w-full md:gap-2 gap-4">
      <header className="flex flex-column md:flex-row gap-2 align-items-center justify-content-between">
        <h2 className="text-5xl">Top Artists</h2>

        <SelectTimeRange value={timeRange} onChange={setTimeRange} />
      </header>

      <main className="flex-column flex w-full gap-4 md:gap-8">
        {/* {items.length === 0 && <p>Oops, there seems to be nothing here.</p>} */}

        {/* {items.length > 0 && ( */}
        <>
          <div className="flex flex-column w-full flex-row flex-wrap gap-6">
            <div className="justify-content-center xl:justify-content-between flex w-full flex-column md:flex-row xl:flex-nowrap gap-6">
              <TopOneElementCard
                {...items[0]}
                skeleton={skeleton}
                image={items[0]?.images[0].url}
              />

              <div className="flex-column flex gap-2 lg:gap-3 sm:w-7 w-full">
                {items.slice(1, 5).map(({ images, ...artist }, index) => (
                  <ElementCard
                    skeleton={skeleton}
                    key={index}
                    {...artist}
                    image={images[0].url}
                    size={ElementCardSize.LARGE}
                    position={index + 2}
                    showGenres={true}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex-column flex w-full gap-2 lg:gap-3">
            {items.slice(5).map(({ images, ...artist }, index) => (
              <ElementCard
                skeleton={skeleton}
                key={index}
                {...artist}
                image={images[0].url}
                size={ElementCardSize.MEDIUM}
                position={index + 6}
              />
            ))}

            {moreItems}
          </div>
        </>
        {/* )} */}

        {children}
      </main>
    </section>
  )
}
