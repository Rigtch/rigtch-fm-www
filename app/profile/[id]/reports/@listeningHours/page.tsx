import { redirect } from 'next/navigation'

import { StatCard } from '../components/cards'
import { ListeningHoursChart } from '../components/charts'
import { getCursors, valueMeasurementFormatter } from '../helpers'
import { ReportSection } from '../sections'

import { StatsMeasurement } from '@app/api/enums'
import { getReportsListeningHours } from '@app/api/fetchers/reports'
import { getServerToken } from '@app/auth'
import { STATS_MEASUREMENT } from '@app/profile/constants'
import type { ProfilePageProps } from '@app/profile/types'
import { validateStatsMeasurement } from '@app/profile/utils/validators'
import { validateId } from '@app/utils/validators'

export default async function ProfileReportsListeningHoursPage({
  params,
  searchParams,
}: ProfilePageProps) {
  const token = await getServerToken()

  if (!token) redirect('/')

  const userId = validateId(params.id)
  const measurement = validateStatsMeasurement(searchParams[STATS_MEASUREMENT])

  const { before: thisWeekBeforeParam, after: thisWeekAfterParam } =
    getCursors()

  const [thisWeekResponse, lastWeekResponse] = await Promise.all([
    getReportsListeningHours(token, {
      userId,
      before: thisWeekBeforeParam,
      after: thisWeekAfterParam,
      measurement,
    }),
    getReportsListeningHours(token, {
      userId,
      before: new Date(thisWeekBeforeParam.getTime() - 1000 * 60 * 60 * 24 * 7),
      after: new Date(thisWeekAfterParam.getTime() - 1000 * 60 * 60 * 24 * 7),
      measurement,
    }),
  ])

  const thisWeekValues = Object.values(thisWeekResponse)
  const lastWeekValues = Object.values(lastWeekResponse)

  const thisWeekMostListenedHourValue = Math.max(...thisWeekValues)
  const thisWeekMostListenedHour = Array.from(
    { length: 24 },
    (_, index) => index + 1
  )[thisWeekValues.indexOf(thisWeekMostListenedHourValue)]
  const lastWeekMostListenedHourValue = Math.max(...lastWeekValues)

  return (
    <ReportSection className="flex-col-reverse">
      <div className="xl:w-1/2">
        <ListeningHoursChart
          thisWeekResponse={thisWeekResponse}
          lastWeekResponse={lastWeekResponse}
          measurement={measurement}
        />
      </div>

      <div className="flex flex-col items-center justify-center gap-4 xl:w-1/2">
        <StatCard
          label="Most listened hour"
          value={thisWeekMostListenedHour}
          valueSize="xl"
        >
          {thisWeekMostListenedHour}:00
        </StatCard>

        <StatCard
          label={`${measurement === StatsMeasurement.PLAYS ? 'Plays' : 'Playtime'} in most listened hour`}
          value={thisWeekMostListenedHourValue}
          lastWeekValue={lastWeekMostListenedHourValue}
          valueSize="xl"
        >
          {valueMeasurementFormatter(
            thisWeekMostListenedHourValue,
            measurement
          )}
        </StatCard>
      </div>
    </ReportSection>
  )
}
