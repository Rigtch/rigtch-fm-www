import { cookies } from 'next/headers'

import '../audio-bars.css'

import { ProfileCard } from '@components/profile'
import { getProfile, getRefresh } from '@api/fetchers'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@api/constants'
import { TopGenresSection } from '@sections/top-genres'

export default async function ProfilePage() {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value
  const refreshToken = cookies().get(REFRESH_TOKEN)?.value

  const profile = await getProfile(accessToken).catch(async error => {
    if (error.message === 'The access token expired' && refreshToken) {
      const { accessToken, expiresIn } = await getRefresh(refreshToken)

      console.log('refreshing token')
      cookies().set(ACCESS_TOKEN, accessToken, {
        maxAge: expiresIn,
        path: '/',
      })
    }

    return getProfile(accessToken)
  })

  return (
    <div className="flex flex-col justify-center w-full px-12 gap-8">
      <ProfileCard {...profile} />

      <TopGenresSection />
    </div>
  )
}
