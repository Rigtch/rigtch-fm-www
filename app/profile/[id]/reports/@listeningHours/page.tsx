import { redirect } from 'next/navigation'
import { LuMoveDown, LuMoveUp } from 'react-icons/lu'

import { ListeningHoursChart } from '../components/charts'
import { valueMeasurementFormatter } from '../helpers'
import { ReportSection } from '../sections'

import { StatsMeasurement } from '@app/api/enums'
import { getReportsListeningHours } from '@app/api/fetchers/reports'
import { getServerToken } from '@app/auth'
import { Card, CardContent, CardDescription } from '@app/components/ui/card'
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

  const thisWeekBeforeParam = new Date(
    `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate() - new Date().getDay()}`
  )
  const thisWeekAfterParam = new Date(
    `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate() - new Date().getDay() - 7}`
  )

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

  const thisWeekResponseValues = Object.values(thisWeekResponse)
  const lastWeekResponseValues = Object.values(lastWeekResponse)

  const thisWeekMostListenedHourValue = Math.max(...thisWeekResponseValues)
  const thisWeekMostListenedHour = Array.from(
    { length: 24 },
    (_, index) => index + 1
  )[thisWeekResponseValues.indexOf(thisWeekMostListenedHourValue)]
  const lastWeekMostListenedHourValue = Math.max(...lastWeekResponseValues)
  const vsLastWeekMostListenedHourPercent = Math.floor(
    ((thisWeekMostListenedHourValue - lastWeekMostListenedHourValue) /
      lastWeekMostListenedHourValue) *
      100
  )

  return (
    <ReportSection className="flex-col-reverse">
      <div className="lg:w-1/2">
        <ListeningHoursChart
          thisWeekResponse={thisWeekResponse}
          lastWeekResponse={lastWeekResponse}
          measurement={measurement}
        />
      </div>

      <div className="flex flex-col gap-4 justify-center items-center lg:w-1/2">
        <Card className="p-4 w-[400px] flex flex-col items-center justify-center gap-2">
          <CardDescription className="p-0 font-semibold text-lg text-nowrap">
            Most listened hour
          </CardDescription>
          <CardContent className="text-6xl ml-6">
            {thisWeekMostListenedHour}:00
          </CardContent>
        </Card>

        <Card className="p-4 w-[400px] flex flex-col items-center justify-center gap-2">
          <CardDescription className="p-0 font-semibold text-lg text-nowrap">
            {measurement === StatsMeasurement.PLAYS ? 'Plays' : 'Playtime'} in
            most listened hour
          </CardDescription>
          <CardContent>
            <p className="text-6xl ml-6">
              {valueMeasurementFormatter(
                thisWeekMostListenedHourValue,
                measurement
              )}
            </p>
            <p className="text-muted-foreground flex items-center gap-1">
              {vsLastWeekMostListenedHourPercent > 0 ? (
                <LuMoveUp />
              ) : (
                <LuMoveDown />
              )}
              {vsLastWeekMostListenedHourPercent}% vs last&apos;s week most
              listened hour
            </p>
          </CardContent>
        </Card>
      </div>
    </ReportSection>
  )
}
