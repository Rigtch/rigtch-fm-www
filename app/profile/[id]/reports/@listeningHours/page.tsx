import { redirect } from 'next/navigation'

import { StatCard } from '../components/cards'
import { ListeningHoursChart } from '../components/charts'
import { validateCursors, valueMeasurementFormatter } from '../helpers'
import { ReportSection } from '../sections'
import type { ProfileReportsPageProps } from '../types/props'

import { StatsMeasurement } from '@app/api/enums'
import { getReportsListeningHours } from '@app/api/fetchers/reports'
import { getServerToken } from '@app/auth'
import { STATS_MEASUREMENT } from '@app/profile/constants'
import { validateStatsMeasurement } from '@app/profile/utils/validators'
import { validateId } from '@app/utils/validators'
import { isPublicUser } from '@app/profile/utils/helpers'

export const runtime = 'edge'

export default async function ProfileReportsListeningHoursPage({
  params,
  searchParams,
}: ProfileReportsPageProps) {
  const token = await getServerToken()
  const userId = validateId(params.id)

  if (!token && !isPublicUser(userId)) redirect('/')

  const measurement = validateStatsMeasurement(searchParams[STATS_MEASUREMENT])

  const { before: thisWeekBeforeParam, after: thisWeekAfterParam } =
    validateCursors(searchParams.before, searchParams.after)

  const [thisWeekResponse, lastWeekResponse] = await Promise.all([
    getReportsListeningHours(token ?? '', {
      userId,
      before: thisWeekBeforeParam,
      after: thisWeekAfterParam,
      measurement,
    }),
    getReportsListeningHours(token ?? '', {
      userId,
      before: new Date(thisWeekBeforeParam.getTime() - 1000 * 60 * 60 * 24 * 7),
      after: new Date(thisWeekAfterParam.getTime() - 1000 * 60 * 60 * 24 * 7),
      measurement,
    }),
  ])

  const thisWeekValues = Object.values(thisWeekResponse)
  const lastWeekValues = Object.values(lastWeekResponse)

  const thisWeekMostListenedHourValue = Math.max(...thisWeekValues)
  const thisWeekMostListenedHour = thisWeekValues.indexOf(
    thisWeekMostListenedHourValue
  )
  const lastWeekMostListenedHourValue = Math.max(...lastWeekValues)

  if (thisWeekMostListenedHourValue === 0) return null

  return (
    <ReportSection className="mb-4 flex-col-reverse">
      <div className="xl:w-1/2">
        <ListeningHoursChart
          thisWeekResponse={thisWeekResponse}
          lastWeekResponse={lastWeekResponse}
          measurement={measurement}
        />
      </div>

      <div className="flex flex-col items-center justify-center gap-2 xl:w-1/2">
        <StatCard
          label="Most listened hour"
          value={thisWeekMostListenedHour}
          size="xl"
          className="!w-full"
        >
          {thisWeekMostListenedHour}:00
        </StatCard>

        <StatCard
          label={`${measurement === StatsMeasurement.PLAYS ? 'Plays' : 'Playtime'} in most listened hour`}
          value={thisWeekMostListenedHourValue}
          lastWeekValue={lastWeekMostListenedHourValue}
          size="xl"
          className="!w-full"
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