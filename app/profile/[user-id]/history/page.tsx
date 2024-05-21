import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { ACCESS_TOKEN } from '@app/api/constants'
import { validateId } from '@app/utils/validate-id'
import { ProfilePageProps } from '@app/profile/types'
import { USER_ID } from '@app/constants'
import { getHistory } from '@app/api/fetchers'
import { HistorySection } from '@app/profile/sections'

export default async function ProfileHistoryPage({ params }: ProfilePageProps) {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value
  const userId = validateId(params[USER_ID])
  const limit = 20

  if (!accessToken) redirect('/')

  const initialData = await getHistory(accessToken, {
    userId,
    limit,
    page: 1,
  })

  return <HistorySection initialData={initialData} limit={limit} />
}
