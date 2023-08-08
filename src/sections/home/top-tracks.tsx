import { TopOneElementCard } from '@components/element'
import { ElementCard, ElementCardSize } from '@components/element/card'
import { useTopTracksQuery } from '@hooks/api'

export function TopTracksSection() {
  const { data } = useTopTracksQuery()

  if (!data) return null

  return (
    <section className="flex-column flex w-full gap-2">
      <header>
        <h2 className="text-5xl">Top Tracks</h2>
      </header>

      <div className="flex-column flex w-full gap-4 md:gap-8">
        <div className="justify-content-center flex w-full flex-row flex-wrap gap-6">
          <TopOneElementCard {...data[0]} image={data[0].album.images[0].url} />

          <div className="flex-column flex gap-2 lg:gap-3 sm:w-7 w-full">
            {data.slice(1, 5).map(({ album, ...track }, index) => (
              <ElementCard
                {...track}
                album={album}
                image={album.images[0].url}
                size={ElementCardSize.LARGE}
                key={index}
                position={index + 1}
                showFromAlbum
              />
            ))}
          </div>

          <div className="flex-column flex w-full gap-2 lg:gap-3">
            {data.slice(5).map(({ album, ...artist }, index) => (
              <ElementCard
                key={index}
                {...artist}
                image={album.images[0].url}
                size={ElementCardSize.MEDIUM}
                position={index + 6}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
