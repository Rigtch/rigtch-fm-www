import { redirect } from 'next/navigation'
import { Suspense } from 'react'

import type { ProfileReportsPageProps } from './types/props'
import { validateCursors } from './helpers'
import { ListeningDaysView } from './views'

import { validateStatsMeasurement } from '@app/profile/utils/validators'
import { STATS_MEASUREMENT } from '@app/profile/constants'
import { getServerToken } from '@app/auth'
import { isPublicUser } from '@app/profile/utils/helpers'
import { validateId } from '@app/utils/validators'

export const runtime = 'edge'

export default async function ProfileReportsPage({
  params,
  searchParams,
}: ProfileReportsPageProps) {
  const token = await getServerToken()
  const userId = validateId(params.id)

  if (!token && !isPublicUser(userId)) redirect('/')

  const measurement = validateStatsMeasurement(searchParams[STATS_MEASUREMENT])
  const cursors = validateCursors(searchParams.before, searchParams.after)

  return (
    <Suspense>
      <ListeningDaysView
        token={token ?? ''}
        userId={userId}
        measurement={measurement}
        cursors={cursors}
      />
    </Suspense>
  )
}
