import { redirect } from 'next/navigation'

import { ListeningDaysChart } from '../components'

import { getReportsListeningDays } from '@app/api/fetchers/reports'
import { getServerToken } from '@app/auth'
import { validateId } from '@app/utils/validators'
import type { ProfilePageProps } from '@app/profile/types'
import { STATS_MEASUREMENT } from '@app/profile/constants'
import { validateStatsMeasurement } from '@app/profile/utils/validators'

export default async function ProfileReportsListeningDaysPage({
  params,
  searchParams,
}: ProfilePageProps) {
  const token = await getServerToken()

  if (!token) redirect('/')

  const userId = validateId(params.id)
  const measurement = validateStatsMeasurement(searchParams[STATS_MEASUREMENT])

  const [thisWeekResponse, lastWeekResponse] = await Promise.all([
    getReportsListeningDays(token, {
      userId,
      after: new Date(
        Date.now() - 1000 * 60 * 60 * 24 * (7 + new Date().getDay() - 1)
      ),
      measurement,
    }),
    getReportsListeningDays(token, {
      userId,
      before: new Date(
        Date.now() - 1000 * 60 * 60 * 24 * (7 + new Date().getDay() - 1)
      ),
      after: new Date(
        Date.now() - 1000 * 60 * 60 * 24 * (14 + new Date().getDay() - 1)
      ),
      measurement,
    }),
  ])

  return (
    <section className="flex flex-col gap-8 px-4">
      <header>
        <h2 className="text-4xl">Listening days</h2>
      </header>

      <main>
        <ListeningDaysChart
          thisWeekResponse={thisWeekResponse}
          lastWeekResponse={lastWeekResponse}
          measurement={measurement}
        />
      </main>
    </section>
  )
}
