import { ElementCard, ElementCardColor } from '@components/element/card'
import { useTopTracksQuery } from '@hooks/api'

export function TopTracksSection() {
  const { data } = useTopTracksQuery()

  if (!data) return null

  return (
    <section className="flex-column flex w-full gap-2">
      <header>
        <h2 className="text-5xl">Top Tracks</h2>
      </header>

      <div className="flex-column flex gap-2 lg:gap-3">
        {data.map(({ album, ...track }, index) => (
          <ElementCard
            {...track}
            album={album}
            image={album.images[0].url}
            key={index}
            position={index + 1}
            color={ElementCardColor.SURFACE_GROUND}
            showFromAlbum
          />
        ))}
      </div>
    </section>
  )
}
