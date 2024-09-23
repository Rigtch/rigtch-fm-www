import { redirect } from 'next/navigation'

import { auth } from '../next-auth'

import { isPublicUser } from '@app/profile/utils/helpers'

export async function getServerToken(userId: string) {
  const session = await auth()

  const token = session?.token.value

  if (!token && !isPublicUser(userId)) redirect('/')

  return token ?? ''
}
