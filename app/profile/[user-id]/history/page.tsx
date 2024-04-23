import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { ACCESS_TOKEN } from '@app/api/constants'
import { validateId } from '@app/utils/validate-id'
import { ProfilePageProps } from '@app/profile/types'
import { USER_ID } from '@app/constants'
import { getHistory } from '@app/api/fetchers'
import { ItemsSection } from '@app/profile/sections'

export default async function ProfileHistoryPage({ params }: ProfilePageProps) {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value
  const userId = validateId(params[USER_ID])

  if (!accessToken) redirect('/')

  const { items } = await getHistory(accessToken, {
    userId,
    limit: 10,
    page: 1,
  })

  return (
    <ItemsSection
      items={items.map(({ track, playedAt }) => ({
        ...track,
        playedAt,
      }))}
      title="History"
      withoutPosition
    />
  )
}
