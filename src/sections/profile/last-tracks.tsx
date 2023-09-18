import Link from 'next/link'

import { ItemCard, ItemCardColor } from '@components/item/card'
import { useLastTracksQuery } from '@api/hooks'

export function LastTracksSection() {
  const { data } = useLastTracksQuery()

  if (!data?.items) return null

  return (
    <section>
      <header>
        <h2 className="text-5xl">Last played tracks</h2>
      </header>

      <main className="flex-column flex gap-2 lg:gap-3">
        {data.items.map(({ album, ...track }, index) => (
          <ItemCard
            {...track}
            color={ItemCardColor.SURFACE_GROUND}
            album={album}
            image={album.images[0].url}
            key={index}
          />
        ))}

        <div className="align-self-center">
          <Link
            href="/profile/last-tracks"
            className="no-underline text-lg text-white transition-color transition-duration-300 hover:text-primary"
          >
            See all
          </Link>
        </div>
      </main>
    </section>
  )
}
