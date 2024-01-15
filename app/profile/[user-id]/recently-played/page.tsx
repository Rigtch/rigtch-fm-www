import { ProfileRecentlyPlayedSection, ProfileSection } from '../../sections'

import { PageProps } from '@app/types'
import { USER_ID } from '@app/constants'

export default function ProfileRecentlyPlayedPage({ params }: PageProps) {
  const userId = params?.[USER_ID]?.toString()

  return (
    <>
      <ProfileSection userId={userId} />

      <ProfileRecentlyPlayedSection limit={50} userId={userId} />
    </>
  )
}
