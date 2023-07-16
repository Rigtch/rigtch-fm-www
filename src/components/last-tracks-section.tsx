import { TrackCard } from './track-card'

import { useLastTracks } from '~/hooks/last-tracks'

export function LastTracksSection() {
  const { lastTracks } = useLastTracks()

  return (
    <section>
      <header>
        <h2 className="text-5xl">Last played tracks</h2>
      </header>

      <main className="flex-column flex gap-2">
        {lastTracks.map((track, index) => (
          <TrackCard {...track} key={index} />
        ))}
      </main>
    </section>
  )
}
