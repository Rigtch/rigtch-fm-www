import { TopArtistCard } from './card'
import { TopOneArtistCard } from './top-one-artist'

import { Artist } from '~/graphql/types'

export interface TopArtistsSectionProps {
  topArtists: Artist[]
}

export function TopArtistsSection({ topArtists }: TopArtistsSectionProps) {
  return (
    <section className="flex-column align-items-center flex gap-2">
      <header>
        <h2 className="text-5xl">Top Artists</h2>
      </header>

      <div className="flex-column flex gap-8">
        <div className="justify-content-center flex w-full flex-row flex-wrap gap-6">
          <TopOneArtistCard topArtist={topArtists[0]} />

          <div className="flex-column flex gap-2">
            {topArtists.slice(1, 5).map((topArtist, index) => (
              <TopArtistCard
                key={index}
                topArtist={topArtist}
                position={index + 2}
                topFive={true}
              />
            ))}
          </div>
        </div>

        <div className="flex-column flex w-full gap-3">
          {topArtists.slice(5).map((topArtist, index) => (
            <TopArtistCard
              key={index}
              topArtist={topArtist}
              position={index + 6}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
