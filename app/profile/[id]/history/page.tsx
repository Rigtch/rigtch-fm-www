import { redirect } from 'next/navigation'

import { validateId } from '@app/utils/validate-id'
import type { ProfilePageProps } from '@app/profile/types'
import { ID } from '@app/constants'
import { getHistory } from '@app/api/fetchers'
import { HistorySection } from '@app/profile/sections'
import { getServerToken } from '@app/auth/utils'

export default async function ProfileHistoryPage({ params }: ProfilePageProps) {
  const userId = validateId(params[ID])
  const limit = 20

  const token = await getServerToken()

  if (!token) redirect('/')

  const initialData = await getHistory(token, {
    userId,
    limit,
    page: 1,
  })

  return <HistorySection initialData={initialData} limit={limit} />
}
