import { redirect } from 'next/navigation'

import { validateId } from '@app/utils/validate-id'
import { USER_ID } from '@app/constants'
import { getUser } from '@app/api/fetchers'
import { ProfileCard } from '@app/profile/components/profile'
import { ProfilePageProps } from '@app/profile/types'
import { getServerToken } from '@app/auth/utils'

export default async function ProfileSubPage({ params }: ProfilePageProps) {
  const userId = validateId(params[USER_ID])

  const token = await getServerToken()

  if (!token) redirect('/')

  const { profile } = await getUser(token, { userId })

  return <ProfileCard {...profile} />
}
