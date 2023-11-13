import { cookies } from 'next/headers'

import { ACCESS_TOKEN } from '@api/constants'
import { getProfile } from '@api/fetchers'

export default async function ProfilePage() {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value

  const { displayName } = await getProfile(accessToken)

  return (
    <div>
      <h1>Hello {displayName}</h1>
    </div>
  )
}
