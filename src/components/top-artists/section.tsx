import { TopArtistCard } from './card'
import { TopOneArtist } from './top-one-artist'

import { Artist } from '~/graphql/types'

export interface TopArtistsSectionProps {
  topArtists: Artist[]
}

export function TopArtistsSection({ topArtists }: TopArtistsSectionProps) {
  return (
    <section className="flex-column align-items-center flex gap-6">
      <TopOneArtist topArtist={topArtists[0]} />

      <div className="flex-column flex w-full gap-3">
        {topArtists.slice(1).map((topArtist, index) => (
          <TopArtistCard key={index} topArtist={topArtist} index={index + 1} />
        ))}
      </div>
    </section>
  )
}
