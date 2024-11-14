import { lazy, Suspense } from 'react'
import { HiOutlineEmojiSad } from 'react-icons/hi'

import { ChartCard, StatCard } from '../components/cards'
import { valueMeasurementFormatter, weekDays } from '../helpers'
import { ReportSection } from '../sections'

import type { ReportsViewProps } from './types/props'

import { StatsMeasurement } from '@app/api/enums'
import { getReportsListeningDays } from '@app/api/fetchers/reports'
import { Alert, AlertDescription, AlertTitle } from '@app/components/ui/alert'

const ListeningDaysChart = lazy(() =>
  import('../components/charts/listening-days-chart').then(
    ({ ListeningDaysChart }) => ({
      default: ListeningDaysChart,
    })
  )
)

export async function ListeningDaysView({
  token,
  userId,
  measurement,
  cursors: { before, after },
}: ReportsViewProps) {
  const [thisWeekResponse, lastWeekResponse] = await Promise.all([
    getReportsListeningDays(token, {
      userId,
      before,
      after,
      measurement,
    }),
    getReportsListeningDays(token, {
      userId,
      before: new Date(before.getTime() - 1000 * 60 * 60 * 24 * 7),
      after: new Date(after.getTime() - 1000 * 60 * 60 * 24 * 7),
      measurement,
    }),
  ])

  const thisWeekValues = Object.values(thisWeekResponse).map(
    ({ value }) => value
  )
  const lastWeekValues = Object.values(lastWeekResponse).map(
    ({ value }) => value
  )

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
            Oops... Looks like nothing&apos;s here, try to select another week.
          </AlertDescription>
        </Alert>
      </div>
    )

  return (
    <ReportSection>
      <div className="flex max-w-[448px] flex-col items-stretch gap-2 xl:w-1/2">
        <StatCard
          label="Total"
          value={thisWeekTotal}
          lastWeekValue={lastWeekTotal}
          size="lg"
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
          size="lg"
        >
          {valueMeasurementFormatter(thisWeekAverageDayValue, measurement)}
        </StatCard>
      </div>

      <ChartCard
        className="max-h-[448px] w-full max-w-[640px]"
        title="Listening days this week"
      >
        <Suspense>
          <ListeningDaysChart
            thisWeekResponse={thisWeekResponse}
            lastWeekResponse={lastWeekResponse}
            measurement={measurement}
          />
        </Suspense>
      </ChartCard>
    </ReportSection>
  )
}
