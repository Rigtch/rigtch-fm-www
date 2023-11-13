import { cookies } from 'next/headers'

import { getProfile } from '@api/fetchers'
import { ACCESS_TOKEN } from '@api/constants'

export default async function ProfilePage() {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value

  const { displayName } = await getProfile(accessToken)

  return (
    <div>
      <h1>Hello {displayName}</h1>
    </div>
  )
}
