'use client'

import { useSearchParams } from 'next/navigation'
import type { ReactNode } from 'react'

import { ReportsPagination } from './components/reports-pagination'
import { AFTER, BEFORE } from './constants/search-params'
import { validateCursors } from './helpers'

import { SelectStatsMeasurement } from '@app/profile/components/common/selects'
import { STATS_MEASUREMENT } from '@app/profile/constants'
import type { ProfileLayoutBaseProps } from '@app/profile/types'
import { validateStatsMeasurement } from '@app/profile/utils/validators'

namespace ProfileReportsLayout {
  export type Props = Readonly<
    ProfileLayoutBaseProps & {
      listeningDays: ReactNode
      listeningHours: ReactNode
      mostListenedItems: ReactNode
      mostListenedGenres: ReactNode
    }
  >
}

function ProfileReportsLayout({
  listeningDays,
  listeningHours,
  mostListenedItems,
  mostListenedGenres,
}: ProfileReportsLayout.Props) {
  const searchParams = useSearchParams()

  const statsMeasurement = validateStatsMeasurement(
    searchParams.get(STATS_MEASUREMENT)
  )

  const { before, after } = validateCursors(
    searchParams.get(BEFORE),
    searchParams.get(AFTER)
  )

  return (
    <section className="mb-6 flex flex-col gap-8 md:mb-12 lg:mb-24 xl:gap-16">
      <header className="flex flex-col gap-4">
        <div className="flex items-center justify-between px-4">
          <h2 className="text-5xl">Reports</h2>

          <ReportsPagination
            after={after}
            before={before}
            className="hidden md:block"
          />

          <SelectStatsMeasurement initialValue={statsMeasurement} />
        </div>

        <ReportsPagination
          after={after}
          before={before}
          className="md:hidden"
        />
      </header>

      <main className="flex flex-col gap-6 xl:gap-8">
        {listeningDays}
        {listeningHours}
        {mostListenedGenres}
        {mostListenedItems}
      </main>
    </section>
  )
}

export default ProfileReportsLayout
