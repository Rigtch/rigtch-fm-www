import { redirect } from 'next/navigation'
import { LuMoveDown, LuMoveUp } from 'react-icons/lu'

import { ListeningDaysChart } from '../components'
import { valueMeasurementFormatter, weekDays } from '../helpers'

import { getReportsListeningDays } from '@app/api/fetchers/reports'
import { getServerToken } from '@app/auth'
import { Card, CardContent, CardDescription } from '@app/components/ui/card'
import { STATS_MEASUREMENT } from '@app/profile/constants'
import type { ProfilePageProps } from '@app/profile/types'
import { validateStatsMeasurement } from '@app/profile/utils/validators'
import { validateId } from '@app/utils/validators'
import { StatsMeasurement } from '@app/api/enums'

export default async function ProfileReportsListeningDaysPage({
  params,
  searchParams,
}: ProfilePageProps) {
  const token = await getServerToken()

  if (!token) redirect('/')

  const userId = validateId(params.id)
  const measurement = validateStatsMeasurement(searchParams[STATS_MEASUREMENT])

  const thisWeekBeforeParam = new Date(
    `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate() - new Date().getDay()}`
  )
  const thisWeekAfterParam = new Date(
    `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate() - new Date().getDay() - 7}`
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

  const thisWeekResponseValues = Object.values(thisWeekResponse)
  const lastWeekResponseValues = Object.values(lastWeekResponse)

  const thisWeekTotal = thisWeekResponseValues.reduce(
    (accumulator, value) => accumulator + value,
    0
  )
  const previousWeekTotal = lastWeekResponseValues.reduce(
    (accumulator, value) => accumulator + value,
    0
  )
  const vsLastWeekTotalPercent = Math.floor(
    ((thisWeekTotal - previousWeekTotal) / previousWeekTotal) * 100
  )

  const mostListenedDayValue = Math.max(...thisWeekResponseValues)
  const mostListenedDay =
    weekDays[thisWeekResponseValues.indexOf(mostListenedDayValue)]
  const leastListenedDayValue = Math.min(...thisWeekResponseValues)
  const leastListenedDay =
    weekDays[thisWeekResponseValues.indexOf(leastListenedDayValue)]

  const averageDayValue = Math.floor(thisWeekTotal / weekDays.length)

  return (
    <section className="flex flex-col gap-8 px-4">
      <main className="flex justify-between gap-4">
        <div className="w-1/2 flex flex-col gap-2 items-stretch">
          <Card className="p-2">
            <CardDescription>Total</CardDescription>
            <CardContent>
              <p className="text-3xl">
                {valueMeasurementFormatter(thisWeekTotal, measurement)}
              </p>
              <p className="text-muted-foreground flex items-center gap-1">
                {vsLastWeekTotalPercent > 0 ? <LuMoveUp /> : <LuMoveDown />}
                {vsLastWeekTotalPercent}% vs last week
              </p>
            </CardContent>
          </Card>

          <Card className="p-2">
            <CardDescription>Most listened day</CardDescription>
            <CardContent className="text-2xl">
              <span className="font-semibold">{mostListenedDay}:</span>&nbsp;
              {valueMeasurementFormatter(mostListenedDayValue, measurement)}
            </CardContent>
          </Card>

          <Card className="p-2">
            <CardDescription>Least listened day</CardDescription>
            <CardContent className="text-2xl">
              <span className="font-semibold">{leastListenedDay}:</span>&nbsp;
              {valueMeasurementFormatter(leastListenedDayValue, measurement)}
            </CardContent>
          </Card>

          <Card className="p-2">
            <CardDescription>
              Average&nbsp;
              {measurement === StatsMeasurement.PLAYS ? 'plays' : 'playtime'}
              &nbsp;per day
            </CardDescription>
            <CardContent className="text-2xl">
              <span className="font-semibold">
                {valueMeasurementFormatter(averageDayValue, measurement)}
              </span>
            </CardContent>
          </Card>
        </div>

        <ListeningDaysChart
          thisWeekResponse={thisWeekResponse}
          lastWeekResponse={lastWeekResponse}
          measurement={measurement}
        />
      </main>
    </section>
  )
}
