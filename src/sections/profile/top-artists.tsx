import { useEffect, useState } from 'react'

import { TimeRange } from '@api/types'
import {
  ElementCard,
  ElementCardSize,
  TopOneElementCard,
} from '@components/element'
import { useTopArtistsQuery } from '@hooks/api'
import { SelectTimeRange } from '@components/select-time-range'

export function TopArtistsSection() {
  const [timeRange, setTimeRange] = useState<TimeRange>(TimeRange.LONG_TERM)
  const { data, refetch } = useTopArtistsQuery(timeRange)

  useEffect(() => {
    refetch()
  }, [timeRange, refetch])

  if (!data) return null

  return (
    <section className="flex-column flex w-full md:gap-2 gap-4">
      <header className="flex flex-column md:flex-row gap-2 align-items-center justify-content-between">
        <h2 className="text-5xl">Top Artists</h2>

        <SelectTimeRange value={timeRange} onChange={setTimeRange} />
      </header>

      <div className="flex-column flex w-full gap-4 md:gap-8">
        <div className="flex flex-column w-full flex-row flex-wrap gap-6">
          <div className="justify-content-center xl:justify-content-between flex w-full flex-column md:flex-row xl:flex-nowrap gap-6">
            <TopOneElementCard {...data[0]} image={data[0]?.images[0].url} />

            <div className="flex-column flex gap-2 lg:gap-3 sm:w-7 w-full">
              {data.slice(1, 5).map(({ images, ...artist }, index) => (
                <ElementCard
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
          {data.slice(5).map(({ images, ...artist }, index) => (
            <ElementCard
              key={index}
              {...artist}
              image={images[0].url}
              size={ElementCardSize.MEDIUM}
              position={index + 6}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
