import { TopArtistsCard } from './card'

import { Artist } from '~/graphql/types/artist'

export interface TopArtistsSectionProps {
  topArtists: Artist[]
}

export function TopArtistsSection({ topArtists }: TopArtistsSectionProps) {
  return (
    <section>
      <div className="flex-column flex gap-3">
        {topArtists.map((topArtist, index) => (
          <TopArtistsCard key={index} topArtist={topArtist} index={index} />
        ))}
      </div>
    </section>
  )
}
