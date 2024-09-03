import { redirect } from 'next/navigation'

import { getCursors, valueMeasurementFormatter } from '../helpers'
import type { ProfileReportsPageProps } from '../types/props'
import { ReportSection } from '../sections'
import { MostListenedGenresChart } from '../components/charts'
import { StatCard } from '../components/cards'

import { getServerToken } from '@app/auth'
import { STATS_MEASUREMENT } from '@app/profile/constants'
import { validateStatsMeasurement } from '@app/profile/utils/validators'
import { validateId } from '@app/utils/validators'
import { getRigtchTopGenres } from '@app/api/fetchers/stats/rigtch'
import { StatsMeasurement } from '@app/api/enums'

export default async function ProfileReportsMostListenedGenresPage({
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

  const [
    thisWeekMostListenedGenresResponse,
    lastWeekMostListenedGenresResponse,
  ] = await Promise.all([
    getRigtchTopGenres(token, {
      userId,
      before: thisWeekBeforeParam,
      after: thisWeekAfterParam,
      measurement,
      limit: 100,
    }),
    getRigtchTopGenres(token, {
      userId,
      before: new Date(thisWeekBeforeParam.getTime() - 1000 * 60 * 60 * 24 * 7),
      after: new Date(thisWeekAfterParam.getTime() - 1000 * 60 * 60 * 24 * 7),
      measurement,
      limit: 100,
    }),
  ])

  if (thisWeekMostListenedGenresResponse.length === 0) return null

  const thisWeekMostListenedGenre = thisWeekMostListenedGenresResponse[0].item
  const thisWeekMostListenedGenreValue =
    measurement === StatsMeasurement.PLAYS
      ? thisWeekMostListenedGenresResponse[0].plays!
      : thisWeekMostListenedGenresResponse[0].playTime!
  const lastWeekMostListenedGenre = lastWeekMostListenedGenresResponse[0].item
  const lastWeekMostListenedGenreValue =
    measurement === StatsMeasurement.PLAYS
      ? lastWeekMostListenedGenresResponse[0].plays!
      : lastWeekMostListenedGenresResponse[0].playTime!

  return (
    <ReportSection>
      <section className="flex flex-col items-stretch justify-center gap-2 2xl:w-1/2">
        <StatCard label="Most listened genre" value={0}>
          <span className="font-semibold">{thisWeekMostListenedGenre}</span>
        </StatCard>

        <StatCard label="Last week's Most listened genre" value={0}>
          <span className="font-semibold">{lastWeekMostListenedGenre}</span>
        </StatCard>

        <StatCard
          valueSize="xl"
          label={`Most listened genre's ${measurement === StatsMeasurement.PLAYS ? 'plays' : 'playtime'}`}
          value={thisWeekMostListenedGenreValue}
          lastWeekValue={lastWeekMostListenedGenreValue}
          className="!w-full"
        >
          {valueMeasurementFormatter(
            thisWeekMostListenedGenreValue,
            measurement
          )}
        </StatCard>
      </section>

      <MostListenedGenresChart
        topGenresResponse={thisWeekMostListenedGenresResponse}
        measurement={measurement}
      />
    </ReportSection>
  )
}
