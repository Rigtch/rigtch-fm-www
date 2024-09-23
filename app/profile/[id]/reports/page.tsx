import { redirect } from 'next/navigation'
import { Suspense } from 'react'

import type { ProfileReportsPageProps } from './types/props'
import { validateCursors } from './helpers'
import {
  ListeningDaysView,
  ListeningHoursView,
  MostListenedGenresView,
  MostListenedItemsView,
} from './views'
import type { ReportsViewProps } from './views/types/props'
import { ReportsPagination } from './components/reports-pagination'

import { validateStatsMeasurement } from '@app/profile/utils/validators'
import { BETA_USER_CREATED_AT, STATS_MEASUREMENT } from '@app/profile/constants'
import { getServerToken } from '@app/auth'
import { isPublicUser } from '@app/profile/utils/helpers'
import { validateId } from '@app/utils/validators'
import { SelectStatsMeasurement } from '@app/profile/components/common/selects'
import { getUser } from '@app/api/fetchers'

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

  const { createdAt } = await getUser(token ?? '', {
    userId,
  })

  const userCreatedAt = createdAt ?? BETA_USER_CREATED_AT

  const viewProps: ReportsViewProps = {
    token: token ?? '',
    userId,
    measurement,
    cursors,
  }

  return (
    <section className="mb-6 flex flex-col gap-8 md:mb-12 lg:mb-24 xl:gap-16">
      <header className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-4xl">Reports</h2>

          <ReportsPagination
            {...cursors}
            userCreatedAt={userCreatedAt}
            className="hidden md:block"
          />

          <SelectStatsMeasurement initialValue={measurement} />
        </div>

        <ReportsPagination
          {...cursors}
          userCreatedAt={userCreatedAt}
          className="md:hidden"
        />
      </header>

      <main className="flex flex-col gap-6 xl:gap-8">
        <Suspense>
          <ListeningDaysView {...viewProps} />
        </Suspense>

        <Suspense>
          <ListeningHoursView {...viewProps} />
        </Suspense>

        <Suspense>
          <MostListenedGenresView {...viewProps} />
        </Suspense>

        <Suspense>
          <MostListenedItemsView {...viewProps} />
        </Suspense>
      </main>
    </section>
  )
}
