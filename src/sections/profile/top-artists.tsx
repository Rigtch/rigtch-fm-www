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
    <section className="flex flex-col gap-8">
      <header>
        <h2 className="text-5xl">Top Artists</h2>
      </header>

      <main>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row self-center items-center md:items-start justify-center gap-4 pt-4 mt-16 lg:mt-24 w-full">
            <div className="flex flex-col-reverse md:flex-row justify-center gap-4 md:w-2/3 h-full">
              {artistsSorted.slice(0, 2).map(({ images, ...artist }) => (
                <TopItemCard
                  {...artist}
                  image={images[0].url}
                  key={artist.id}
                />
              ))}
            </div>

            <div className="md:w-1/3 h-full">
              {artistsSorted.slice(2, 3).map(({ images, ...artist }) => (
                <TopItemCard
                  {...artist}
                  image={images[0].url}
                  key={artist.id}
                />
              ))}
            </div>
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
