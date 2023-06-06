import { TopArtistCard } from './card'

import { Artist } from '~/graphql/types'

export interface TopArtistsSectionProps {
  topArtists: Artist[]
}

export function TopArtistsSection({ topArtists }: TopArtistsSectionProps) {
  return (
    <section className="flex-column flex gap-3">
      {topArtists.map((topArtist, index) => (
        <TopArtistCard key={index} topArtist={topArtist} index={index + 1} />
      ))}
    </section>
  )
}
