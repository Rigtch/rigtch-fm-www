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
        <AnalysisCardItem
          title="Danceability"
          description="Shows if your music makes you wanna dance."
          value={danceability * 100}
        />
        <AnalysisCardItem
          title="Acousticness"
          description="Shows how acoustic is your music."
          value={acousticness * 100}
        />
        <AnalysisCardItem
          title="Instrumentalness"
          description="Shows if you listen to songs without lyrics."
          value={instrumentalness * 100}
        />
      </div>

      <div className="grid">
        <AnalysisCardItem
          title="Speechiness"
          description="Shows if you prefer vocals or instruments."
          value={speechiness * 100}
        />
        <AnalysisCardItem
          title="Liveness"
          description="Shows the propability of your music being performed live."
          value={liveness * 100}
        />
        <AnalysisCardItem
          title="Energy"
          description="Shows how energetic is your music."
          value={energy * 100}
        />
      </div>

      <div className="grid">
        <AnalysisCardItem
          title="Valence"
          description="Shows if your music is more positive or negative."
          value={valence * 100}
        />
        <AnalysisCardItem
          title="Loudness"
          description="Shows what level of sound you prefer."
          value={loudness + 60}
        />
        <AnalysisCardItem
          title="Tempo"
          description="The overall estimated tempo of your music in beats per minute (BPM)."
          value={(tempo / 260) * 100}
          showValue
          displayValueTemplate={() => `${Number(tempo).toFixed(2)} BPM`}
        />
      </div>
    </Card>
  )
}
