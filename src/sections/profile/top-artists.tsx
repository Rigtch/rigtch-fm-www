import { Artist, SpotifyResponseWithOffset } from '@api/types'
import { ItemCard } from '@components/item/card'
import { TopItemCard } from '@components/item/top-card/top-card'

export interface TopArtistsSectionProps {
  artists: SpotifyResponseWithOffset<Artist>
}

export function TopArtistsSection({ artists }: TopArtistsSectionProps) {
  return (
    <section className="flex flex-col gap-3">
      <header>
        <h2 className="text-5xl">Top Artists</h2>
      </header>

      <main>
        <div className="flex flex-col gap-5">
          <div className="flex flex-row gap-3">
            {artists.items.slice(0, 3).map(({ images, ...artist }, index) => (
              <TopItemCard
                {...artist}
                image={images[0].url}
                key={artist.id}
                position={index + 1}
              />
            ))}
          </div>

          {artists.items.slice(3).map(({ images, ...artist }, index) => (
            <ItemCard
              {...artist}
              image={images[0].url}
              key={artist.id}
              position={index + 4}
            />
          ))}
        </div>
      </main>
    </section>
  )
}
