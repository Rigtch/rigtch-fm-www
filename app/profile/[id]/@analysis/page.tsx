import { redirect } from 'next/navigation'

import { validateId } from '@app/utils/validators'
import { DefaultSection } from '@app/sections'
import { Progress } from '@app/components/ui/progress'
import type { ProfilePageProps } from '@app/profile/types'
import { getServerToken } from '@app/auth/utils'
import { getSpotifyAnalysis } from '@app/api/fetchers/stats/spotify'

export const runtime = 'edge'

interface AnalysisItem {
  title: string
  description?: string
  value: number
  displayValueTemplate?: () => string
  subTitle?: string
}

export default async function ProfileAnalysisSubPage({
  params,
}: ProfilePageProps) {
  const userId = validateId(params.id)
  const token = await getServerToken()

  if (!token) redirect('/')

  const {
    danceability,
    acousticness,
    instrumentalness,
    speechiness,
    liveness,
    energy,
    valence,
    loudness,
    tempo,
  } = await getSpotifyAnalysis(token, {
    userId,
  })

  const items: AnalysisItem[] = [
    {
      title: 'Danceable',
      value: danceability * 100,
      subTitle: 'Unrythmical',
    },
    {
      title: 'Acoustic',
      value: acousticness * 100,
      subTitle: 'Electric',
    },
    {
      title: 'Instrumental',
      value: instrumentalness * 100,
      subTitle: 'Lyrical',
    },
    {
      title: 'Lyrical',
      value: speechiness * 100,
      subTitle: 'Musical',
    },
    {
      title: 'Live',
      value: liveness * 100,
      subTitle: 'Studio',
    },
    {
      title: 'Energetic',
      value: energy * 100,
      subTitle: 'Relaxing',
    },
    {
      title: 'Positive',
      value: valence * 100,
      subTitle: 'Negative',
    },
    {
      title: 'Loud',
      value: loudness + 60,
      subTitle: 'Soft',
    },
    {
      title: 'Tempo',
      description:
        'The overall estimated tempo of your music in beats per minute (BPM).',
      value: tempo,
    },
  ]

  return (
    <DefaultSection title="Analysis">
      <div className="flex flex-col md:flex-row md:justify-around flex-wrap gap-8 px-4 py-6">
        {items.map(({ title, description, value, subTitle }, index) => (
          <div key={index} className="flex flex-col gap-2 md:w-1/4">
            <h2 className="text-xl font-bold">{title}</h2>

            <Progress
              value={title === 'Tempo' ? (value / 240) * 100 : value}
              className="w-full h-5 bg-primary *:bg-[linear-gradient(to_top_left,#9400d5,#1e89ee)] overflow-hidden *:skew-x-12"
            />

            {title === 'Tempo' && (
              <span className="text-center text-xl">
                {value.toFixed(2)} BPM
              </span>
            )}

            <h2 className="text-right text-xl font-bold">{subTitle}</h2>

            <span className="text-sm">{description}</span>
          </div>
        ))}
      </div>
    </DefaultSection>
  )
}
