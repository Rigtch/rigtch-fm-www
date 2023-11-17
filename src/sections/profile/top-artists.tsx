'use client'

import { Artist } from '@api/types'
import { Item, TopItemCard } from '@components/item'
import { Separator } from '@components/ui/separator'

export interface TopArtistsSectionProps {
  items: Artist[]
}

export function TopArtistsSection({ items }: TopArtistsSectionProps) {
  const artistsSorted = items.map((artist, index) => ({
    ...artist,
    position: index + 1,
  }))

  artistsSorted.splice(0, 2, artistsSorted[1], artistsSorted[0])

  return (
    <section className="flex flex-col gap-3">
      <header>
        <h2 className="text-5xl">Top Artists</h2>
      </header>

      <main>
        <div className="flex flex-col gap-5">
          <div className="flex flex-row gap-3">
            {artistsSorted.slice(0, 3).map(({ images, ...artist }) => (
              <TopItemCard {...artist} image={images[0].url} key={artist.id} />
            ))}
          </div>

          <div className="flex flex-col gap-2">
            {artistsSorted.slice(3).map(({ images, ...artist }, index) => (
              <div key={artist.id}>
                <Item {...artist} image={images[0].url} />

                {index !== items.length - 4 && <Separator />}
              </div>
            ))}
          </div>
        </div>
      </main>
    </section>
  )
}
