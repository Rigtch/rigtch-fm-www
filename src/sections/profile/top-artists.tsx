import { Artist, SpotifyResponseWithOffset } from '@api/types'
import { Item, TopItemCard } from '@components/item'
import { Separator } from '@components/ui/separator'

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

          <div className="flex flex-col gap-2">
            {artists.items.slice(3).map(({ images, ...artist }, index) => (
              <div key={artist.id}>
                <Item {...artist} image={images[0].url} position={index + 4} />

                {index !== artists.items.length - 4 && <Separator />}
              </div>
            ))}
          </div>
        </div>
      </main>
    </section>
  )
}
