import { Card } from 'primereact/card'

import { AnalysisCardItem, AnalysisCardItemProps } from './card-item'

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
  const items: AnalysisCardItemProps[][] = [
    [
      {
        title: 'Danceability',
        description: 'Shows if your music makes you wanna dance.',
        value: danceability * 100,
      },
      {
        title: 'Acousticness',
        description: 'Shows how acoustic is your music.',
        value: acousticness * 100,
      },
      {
        title: 'Instrumentalness',
        description: 'Shows if you listen to songs without lyrics.',
        value: instrumentalness * 100,
      },
    ],
    [
      {
        title: 'Speechiness',
        description: 'Shows if you prefer vocals or instruments.',
        value: speechiness * 100,
      },
      {
        title: 'Liveness',
        description:
          'Shows the propability of your music being performed live.',
        value: liveness * 100,
      },
      {
        title: 'Energy',
        description: 'Shows how energetic is your music.',
        value: energy * 100,
      },
    ],
    [
      {
        title: 'Valence',
        description: 'Shows if your music is more positive or negative.',
        value: valence * 100,
      },
      {
        title: 'Loudness',
        description: 'Shows what level of sound you prefer.',
        value: loudness + 60,
      },
      {
        title: 'Tempo',
        description:
          'The overall estimated tempo of your music in beats per minute (BPM).',
        value: (tempo / 260) * 100,
        showValue: true,
        displayValueTemplate: () => `${Number(tempo).toFixed(2)} BPM`,
      },
    ],
  ]

  return (
    <Card>
      {items.map((row, index) => (
        <div className="grid" key={index}>
          {row.map((item, index) => (
            <AnalysisCardItem key={index} {...item} />
          ))}
        </div>
      ))}
    </Card>
  )
}
