import { cookies } from 'next/headers'

import ProfileCard from '@components/profile/card'
import { getProfile } from '@api/fetchers'
import { ACCESS_TOKEN } from '@api/constants'

export default async function ProfilePage() {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value

  const profile = await getProfile(accessToken)

  return (
    <div className="flex justify-center">
      <ProfileCard {...profile} />
    </div>
  )
}
