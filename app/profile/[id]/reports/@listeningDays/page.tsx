import { redirect } from 'next/navigation'
import { HiOutlineEmojiSad } from 'react-icons/hi'

import { StatCard } from '../components/cards'
import { ListeningDaysChart } from '../components/charts'
import { getCursors, valueMeasurementFormatter, weekDays } from '../helpers'
import { ReportSection } from '../sections'
import type { ProfileReportsPageProps } from '../types/props'

import { StatsMeasurement } from '@app/api/enums'
import { getReportsListeningDays } from '@app/api/fetchers/reports'
import { getServerToken } from '@app/auth'
import { STATS_MEASUREMENT } from '@app/profile/constants'
import { validateStatsMeasurement } from '@app/profile/utils/validators'
import { validateId } from '@app/utils/validators'
import { Alert, AlertDescription, AlertTitle } from '@app/components/ui/alert'

export default async function ProfileReportsListeningDaysPage({
  params,
  searchParams,
}: ProfileReportsPageProps) {
  const token = await getServerToken()

  if (!token) redirect('/')

  const userId = validateId(params.id)
  const measurement = validateStatsMeasurement(searchParams[STATS_MEASUREMENT])

  const { before: thisWeekBeforeParam, after: thisWeekAfterParam } = getCursors(
    searchParams.before,
    searchParams.after
  )

  const [thisWeekResponse, lastWeekResponse] = await Promise.all([
    getReportsListeningDays(token, {
      userId,
      before: thisWeekBeforeParam,
      after: thisWeekAfterParam,
      measurement,
    }),
    getReportsListeningDays(token, {
      userId,
      before: new Date(thisWeekBeforeParam.getTime() - 1000 * 60 * 60 * 24 * 7),
      after: new Date(thisWeekAfterParam.getTime() - 1000 * 60 * 60 * 24 * 7),
      measurement,
    }),
  ])

  const thisWeekValues = Object.values(thisWeekResponse)
  const lastWeekValues = Object.values(lastWeekResponse)

  const thisWeekTotal = thisWeekValues.reduce(
    (accumulator, value) => accumulator + value,
    0
  )
  const lastWeekTotal = lastWeekValues.reduce(
    (accumulator, value) => accumulator + value,
    0
  )

  const thisWeekMostListenedDayValue = Math.max(...thisWeekValues)
  const thisWeekMostListenedDay =
    weekDays[thisWeekValues.indexOf(thisWeekMostListenedDayValue)]
  const lastWeekMostListenedDayValue = Math.max(...lastWeekValues)

  const leastListenedDayValue = Math.min(...thisWeekValues)
  const leastListenedDay =
    weekDays[thisWeekValues.indexOf(leastListenedDayValue)]

  const thisWeekAverageDayValue = Math.floor(thisWeekTotal / weekDays.length)
  const lastWeekAverageDayValue = Math.floor(lastWeekTotal / weekDays.length)

  if (thisWeekMostListenedDayValue === 0)
    return (
      <div className="p-4">
        <Alert variant="destructive">
          <HiOutlineEmojiSad className="h-5 w-5" />

          <AlertTitle>No Data for this week</AlertTitle>

          <AlertDescription>
            Oops... Looks like nothing&apos;s here, try to select other week.
          </AlertDescription>
        </Alert>
      </div>
    )

  return (
    <ReportSection>
      <div className="flex flex-col items-stretch gap-2 xl:w-1/2">
        <StatCard
          label="Total"
          value={thisWeekTotal}
          lastWeekValue={lastWeekTotal}
          valueSize="lg"
        >
          {valueMeasurementFormatter(thisWeekTotal, measurement)}
        </StatCard>

        <StatCard
          label="Most listened day"
          value={thisWeekMostListenedDayValue}
          lastWeekValue={lastWeekMostListenedDayValue}
        >
          <span className="font-semibold">{thisWeekMostListenedDay}:</span>
          &nbsp;
          {valueMeasurementFormatter(thisWeekMostListenedDayValue, measurement)}
        </StatCard>

        <StatCard label="Least listened day" value={leastListenedDayValue}>
          <span className="font-semibold">{leastListenedDay}:</span>
          &nbsp;
          {valueMeasurementFormatter(leastListenedDayValue, measurement)}
        </StatCard>

        <StatCard
          label={`Average ${measurement === StatsMeasurement.PLAYS ? 'plays' : 'playtime'} per day`}
          value={thisWeekAverageDayValue}
          lastWeekValue={lastWeekAverageDayValue}
          valueSize="lg"
        >
          {valueMeasurementFormatter(thisWeekAverageDayValue, measurement)}
        </StatCard>
      </div>

      <ListeningDaysChart
        thisWeekResponse={thisWeekResponse}
        lastWeekResponse={lastWeekResponse}
        measurement={measurement}
      />
    </ReportSection>
  )
}
