import { getHistory } from '@app/api/fetchers'
import { getServerToken } from '@app/auth/utils'
import { HistorySection } from '@app/profile/sections'
import type { ProfilePageProps } from '@app/profile/types'
import { validateId } from '@app/utils/validators'

export default async function ProfileHistoryPage({ params }: ProfilePageProps) {
  const limit = 50

  const userId = validateId(params.id)
  const token = await getServerToken(userId)

  const initialData = await getHistory(token, {
    userId,
    limit,
    page: 1,
  })

  return <HistorySection initialData={initialData} limit={limit} />
}
