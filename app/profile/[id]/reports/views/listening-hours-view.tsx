import { lazy, Suspense } from 'react'

import { ChartCard, StatCard } from '../components/cards'
import { valueMeasurementFormatter } from '../helpers'
import { ReportSection } from '../sections'

import type { ReportsViewProps } from './types/props'

import { getReportsListeningHours } from '@app/api/fetchers/reports'
import { StatsMeasurement } from '@app/api/enums'

const ListeningHoursChart = lazy(() =>
  import('../components/charts/listening-hours-chart').then(
    ({ ListeningHoursChart }) => ({
      default: ListeningHoursChart,
    })
  )
)

export async function ListeningHoursView({
  token,
  userId,
  measurement,
  cursors: { before, after },
}: ReportsViewProps) {
  const [thisWeekResponse, lastWeekResponse] = await Promise.all([
    getReportsListeningHours(token, {
      userId,
      before,
      after,
      measurement,
    }),
    getReportsListeningHours(token, {
      userId,
      before: new Date(before.getTime() - 1000 * 60 * 60 * 24 * 7),
      after: new Date(after.getTime() - 1000 * 60 * 60 * 24 * 7),
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
    <>
      <h3 className="text-2xl">Listening hours</h3>

      <ReportSection className="mb-4 flex-col-reverse">
        <div className="w-full xl:max-w-[622px]">
          <ChartCard title="Listening hours">
            <Suspense>
              <ListeningHoursChart
                thisWeekResponse={thisWeekResponse}
                lastWeekResponse={lastWeekResponse}
                measurement={measurement}
              />
            </Suspense>
          </ChartCard>
        </div>

        <div className="flex w-full flex-col items-center justify-start gap-4 xl:max-w-[500px]">
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
    </>
  )
}
