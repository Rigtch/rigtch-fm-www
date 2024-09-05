import { redirect } from 'next/navigation'

import { validateId } from '@app/utils/validators'
import type { ProfilePageProps } from '@app/profile/types'
import { getHistory } from '@app/api/fetchers'
import { HistorySection } from '@app/profile/sections'
import { getServerToken } from '@app/auth/utils'
import { isPublicUser } from '@app/profile/utils/helpers'

export const runtime = 'edge'

export default async function ProfileHistoryPage({ params }: ProfilePageProps) {
  const userId = validateId(params.id)
  const limit = 20

  const token = await getServerToken()

  if (!token && !isPublicUser(userId)) redirect('/')

  const initialData = await getHistory(token ?? '', {
    userId,
    limit,
    page: 1,
  })

  return <HistorySection initialData={initialData} limit={limit} />
}
