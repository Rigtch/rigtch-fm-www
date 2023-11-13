import { cookies } from 'next/headers'

import { ACCESS_TOKEN } from '@api/constants'
import { fetchApi } from '@api/fetchers'
import { Profile } from '@api/types'

export default async function ProfilePage() {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value

  const { displayName } = await fetchApi<Profile>('/auth/profile', {
    token: accessToken,
  })

  return (
    <div>
      <h1>Hello {displayName}</h1>
    </div>
  )
}
