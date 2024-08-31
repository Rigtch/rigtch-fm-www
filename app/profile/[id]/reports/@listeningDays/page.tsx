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

  const requestedWeekBeforeParam = new Date(
    `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate() - new Date().getDay()}`
  )
  const requestedWeekAfterParam = new Date(
    `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate() - new Date().getDay() - 7}`
  )

  const [thisWeekResponse, lastWeekResponse] = await Promise.all([
    getReportsListeningDays(token, {
      userId,
      before: requestedWeekBeforeParam,
      after: requestedWeekAfterParam,
      measurement,
    }),
    getReportsListeningDays(token, {
      userId,
      before: new Date(
        requestedWeekBeforeParam.getTime() - 1000 * 60 * 60 * 24 * 7
      ),
      after: new Date(
        requestedWeekAfterParam.getTime() - 1000 * 60 * 60 * 24 * 7
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
