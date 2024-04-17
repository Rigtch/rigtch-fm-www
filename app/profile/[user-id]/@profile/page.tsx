import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

import { validateId } from '@app/utils/validate-id'
import { USER_ID } from '@app/constants'
import { ACCESS_TOKEN } from '@app/api/constants'
import { getUser } from '@app/api/fetchers'
import { ProfileCard } from '@app/profile/components/profile'
import { ProfilePageProps } from '@app/profile/types'

export default async function ProfileSubPage({ params }: ProfilePageProps) {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value
  const userId = validateId(params[USER_ID])

  if (!accessToken) redirect('/')

  const { profile } = await getUser(accessToken, { userId })

  return <ProfileCard {...profile} />
}
