import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'

import { ProfileTopSectionProps } from '../types'
import { ProfileCard } from '../components/profile'

import {
  ACCESS_TOKEN,
  USER_NOT_FOUND,
  VALIDATION_FAILED_UUID_EXPECTED,
} from '@app/api/constants'
import { getUser } from '@app/api/fetchers'

export async function ProfileSection({
  userId,
}: Omit<ProfileTopSectionProps, 'searchParams'>) {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value

  try {
    if (!userId) return notFound()
    if (!accessToken) redirect('/')

    const { profile } = await getUser(accessToken, { userId })

    return <ProfileCard {...profile} />
  } catch (error) {
    console.error(error)

    if (
      error instanceof Error &&
      [VALIDATION_FAILED_UUID_EXPECTED, USER_NOT_FOUND].includes(error.message)
    )
      return notFound()
  }
}
