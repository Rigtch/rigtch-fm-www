import {
  ElementCard,
  ElementCardSize,
  TopOneElementCard,
} from '@components/element'
import { useTopArtistsQuery } from '@hooks/api'

export function TopArtistsSection() {
  const { data } = useTopArtistsQuery()

  if (!data) return null

  return (
    <section className="flex-column flex w-full gap-2">
      <header>
        <h2 className="text-5xl">Top Artists</h2>
      </header>

      <div className="flex-column flex w-full gap-8">
        <div className="justify-content-center flex w-full flex-row flex-wrap gap-6">
          <TopOneElementCard {...data[0]} image={data[0].images[0].url} />

          <div className="flex-column flex gap-2 md:w-7">
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

        <div className="flex-column flex w-full gap-3">
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
