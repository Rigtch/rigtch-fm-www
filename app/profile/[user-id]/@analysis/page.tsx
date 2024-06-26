'use server'

import { redirect } from 'next/navigation'

import { validateId } from '@app/utils/validate-id'
import { getAnalysis } from '@app/api/fetchers'
import { DefaultSection } from '@app/sections'
import { Progress } from '@app/components/ui/progress'
import type { ProfilePageProps } from '@app/profile/types'
import { USER_ID } from '@app/constants'
import { getServerToken } from '@app/auth/utils'

export interface Item {
  title: string
  description?: string
  value: number
  displayValueTemplate?: () => string
  subTitle?: string
}

export default async function ProfileAnalysisSubPage({
  params,
}: ProfilePageProps) {
  const userId = validateId(params[USER_ID])
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
  } = await getAnalysis(token, {
    userId,
  })

  const items: Item[] = [
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
              value={value}
              className="h-4 "
              style={{
                backgroundImage:
                  'linear-gradient(to top right, #9400d5, #1e89ee)',
              }}
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
