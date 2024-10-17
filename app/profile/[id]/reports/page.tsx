import { Suspense } from 'react'

import { ReportsPagination } from './components/reports-pagination'
import { validateCursors } from './helpers'
import type { ProfileReportsPageProps } from './types/props'
import {
  ListeningDaysView,
  ListeningHoursView,
  MostListenedGenresView,
  MostListenedItemsView,
} from './views'
import type { ReportsViewProps } from './views/types/props'

import { getUser } from '@app/api/fetchers'
import { getServerToken } from '@app/auth'
import { SelectStatsMeasurement } from '@app/profile/components/common/selects'
import { BETA_USER_CREATED_AT, STATS_MEASUREMENT } from '@app/profile/constants'
import { validateStatsMeasurement } from '@app/profile/utils/validators'
import { validateId } from '@app/utils/validators'

export default async function ProfileReportsPage({
  params,
  searchParams,
}: ProfileReportsPageProps) {
  const userId = validateId(params.id)
  const token = await getServerToken(userId)

  const { createdAt } = await getUser(token, {
    userId,
  })
  const userCreatedAt = createdAt ?? BETA_USER_CREATED_AT

  const measurement = validateStatsMeasurement(searchParams[STATS_MEASUREMENT])
  const cursors = validateCursors(searchParams.before, searchParams.after)

  const viewProps: ReportsViewProps = {
    token,
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
