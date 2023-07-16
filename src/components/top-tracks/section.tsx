import { TrackCard } from '../track-card'

import { Track } from '~/graphql/types'

export interface TopTracksSectionProps {
  topTracks: Track[]
}

export function TopTracksSection({ topTracks }: TopTracksSectionProps) {
  return (
    <section className="flex-column flex w-full gap-2">
      <header>
        <h2 className="text-5xl">Top Tracks</h2>
      </header>

      <div className="flex-column flex gap-3">
        {topTracks.map((track, index) => (
          <TrackCard
            {...track}
            key={index}
            topTrack={true}
            position={index + 1}
          />
        ))}
      </div>
    </section>
  )
}
