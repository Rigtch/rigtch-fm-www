import { redirect } from 'next/navigation'
import { Suspense } from 'react'

import type { ProfileReportsPageProps } from './types/props'
import { validateCursors } from './helpers'
import { ListeningDaysView, ListeningHoursView } from './views'
import type { ReportsViewProps } from './views/types/props'

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

  const viewProps: ReportsViewProps = {
    token: token ?? '',
    userId,
    measurement,
    cursors,
  }

  return (
    <>
      <Suspense>
        <ListeningDaysView {...viewProps} />
      </Suspense>

      <Suspense>
        <ListeningHoursView {...viewProps} />
      </Suspense>
    </>
  )
}
