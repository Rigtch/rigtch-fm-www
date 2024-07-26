import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { getUser } from '@app/api/fetchers'
import { getServerToken } from '@app/auth'
import type { ProfilePageProps } from '@app/profile/types'

export const runtime = 'edge'

export async function generateMetadata({
  params: { id },
}: ProfilePageProps): Promise<Metadata> {
  const token = await getServerToken()

  if (!token) redirect('/')

  const {
    profile: { displayName },
  } = await getUser(token, { userId: id })

  return {
    title: `${displayName}'s profile`,
  }
}

export { default } from './page'
