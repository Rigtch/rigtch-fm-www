import { ElementCard, ElementCardColor } from './element/card'

import { useLastTracks } from '~/hooks/api'

export function LastTracksSection() {
  const { data } = useLastTracks()

  if (!data) return null

  return (
    <section>
      <header>
        <h2 className="text-5xl">Last played tracks</h2>
      </header>

      <main className="flex-column flex gap-2">
        {data.map(({ album, ...track }, index) => (
          <ElementCard
            {...track}
            color={ElementCardColor.SURFACE_GROUND}
            album={album}
            image={album.images[0].url}
            key={index}
          />
        ))}
      </main>
    </section>
  )
}
