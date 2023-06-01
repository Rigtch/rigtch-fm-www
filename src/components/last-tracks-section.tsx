import { TrackCard } from './track-card'

import { Track } from '~/graphql/types'

export interface LastTracksSectionProps {
  tracks: Track[]
}

export function LastTracksSection({ tracks }: LastTracksSectionProps) {
  return (
    <section>
      <header>
        <h2 className="text-4xl">Last played tracks</h2>
      </header>

      <main className="flex-column flex gap-1">
        {tracks.map(track => (
          <TrackCard {...track} key={track.name} />
        ))}
      </main>
    </section>
  )
}
