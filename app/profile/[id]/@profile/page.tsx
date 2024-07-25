import { redirect } from 'next/navigation'

import { validateId } from '@app/utils/validators'
import { getUser } from '@app/api/fetchers'
import { ProfileCard } from '@app/profile/components/profile'
import type { ProfilePageProps } from '@app/profile/types'
import { getServerToken } from '@app/auth/utils'
import { Playback } from '@app/profile/components/playback'

export const runtime = 'edge'

export default async function ProfileSubPage({ params }: ProfilePageProps) {
  const userId = validateId(params.id)

  const token = await getServerToken()

  if (!token) redirect('/')

  const { profile } = await getUser(token, { userId })

  return (
    <div className="px-4">
      <ProfileCard {...profile}>
        <Playback />
      </ProfileCard>
    </div>
  )
}
