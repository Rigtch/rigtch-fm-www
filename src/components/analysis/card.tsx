import { Card } from 'primereact/card'

import { AnalysisCardItem } from './card-item'

import { Analysis } from '@api/types'

export function AnalysisCard({
  danceability,
  acousticness,
  instrumentalness,
  speechiness,
  liveness,
  loudness,
  energy,
  tempo,
  valence,
}: Analysis) {
  return (
    <Card>
      <div className="grid">
        <AnalysisCardItem title="Danceability" value={danceability * 100} />
        <AnalysisCardItem title="Acousticness" value={acousticness * 100} />
        <AnalysisCardItem
          title="Instrumentalness"
          value={instrumentalness * 100}
        />
      </div>

      <div className="grid">
        <AnalysisCardItem title="Speechiness" value={speechiness * 100} />
        <AnalysisCardItem title="Liveness" value={liveness * 100} />
        <AnalysisCardItem title="Energy" value={energy * 100} />
      </div>

      <div className="grid">
        <AnalysisCardItem title="Valence" value={valence * 100} />
        <AnalysisCardItem title="Loudness" value={loudness + 60} />
        <AnalysisCardItem
          title="Tempo"
          value={(tempo / 240) * 100}
          showValue
          displayValueTemplate={() => `${Number(tempo).toFixed(2)} BPM`}
        />
      </div>
    </Card>
  )
}
