import { cookies } from 'next/headers'

import '../audio-bars.css'

import { ProfileCard } from '@components/profile'
import { getProfile } from '@api/fetchers'
import { ACCESS_TOKEN } from '@api/constants'
import { TopGenresSection } from '@sections/top-genres'

export default async function ProfilePage() {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value

  const profile = await getProfile(accessToken)

  return (
    <div className="flex flex-col justify-center w-full px-4 md:px-12 gap-8">
      <ProfileCard {...profile} />

      <TopGenresSection />
    </div>
  )
}
