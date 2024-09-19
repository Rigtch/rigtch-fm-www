import { redirect } from 'next/navigation'
import { lazy, Suspense } from 'react'

import { validateCursors, valueMeasurementFormatter } from '../helpers'
import type { ProfileReportsPageProps } from '../types/props'
import { ReportSection } from '../sections'
import { StatCard } from '../components/cards'

import { getServerToken } from '@app/auth'
import { STATS_MEASUREMENT } from '@app/profile/constants'
import { validateStatsMeasurement } from '@app/profile/utils/validators'
import { validateId } from '@app/utils/validators'
import { getRigtchTopGenres } from '@app/api/fetchers/stats/rigtch'
import { StatsMeasurement } from '@app/api/enums'
import { isPublicUser } from '@app/profile/utils/helpers'
import { getReportsGenresListeningDays } from '@app/api/fetchers/reports'

const MostListenedGenresChart = lazy(() =>
  import('../components/charts/most-listened-genres-chart').then(
    ({ MostListenedGenresChart }) => ({
      default: MostListenedGenresChart,
    })
  )
)

const GenresListeningDaysChart = lazy(() =>
  import('../components/charts/genres-listening-days-chart').then(
    ({ GenresListeningDaysChart }) => ({
      default: GenresListeningDaysChart,
    })
  )
)

export const runtime = 'edge'

export default async function ProfileReportsMostListenedGenresPage({
  params,
  searchParams,
}: ProfileReportsPageProps) {
  const token = await getServerToken()
  const userId = validateId(params.id)

  if (!token && !isPublicUser(userId)) redirect('/')

  const measurement = validateStatsMeasurement(searchParams[STATS_MEASUREMENT])

  const { before: thisWeekBeforeParam, after: thisWeekAfterParam } =
    validateCursors(searchParams.before, searchParams.after)

  const [
    thisWeekMostListenedGenresResponse,
    lastWeekMostListenedGenresResponse,
    genresListeningDaysResponse,
  ] = await Promise.all([
    getRigtchTopGenres(token ?? '', {
      userId,
      before: thisWeekBeforeParam,
      after: thisWeekAfterParam,
      measurement,
      limit: 5,
    }),
    getRigtchTopGenres(token ?? '', {
      userId,
      before: new Date(thisWeekBeforeParam.getTime() - 1000 * 60 * 60 * 24 * 7),
      after: new Date(thisWeekAfterParam.getTime() - 1000 * 60 * 60 * 24 * 7),
      measurement,
      limit: 5,
    }),
    getReportsGenresListeningDays(token ?? '', {
      userId,
      before: thisWeekBeforeParam,
      after: thisWeekAfterParam,
      measurement,
    }),
  ])

  if (thisWeekMostListenedGenresResponse.length === 0) return null
  if (genresListeningDaysResponse.length === 0) return null

  const isLastWeekAvailable = lastWeekMostListenedGenresResponse.length > 0

  const thisWeekMostListenedGenre = thisWeekMostListenedGenresResponse[0].item
  const thisWeekMostListenedGenreValue =
    measurement === StatsMeasurement.PLAYS
      ? thisWeekMostListenedGenresResponse[0].plays!
      : thisWeekMostListenedGenresResponse[0].playTime!
  const lastWeekMostListenedGenre = isLastWeekAvailable
    ? lastWeekMostListenedGenresResponse[0].item
    : undefined
  const lastWeekMostListenedGenreValue = isLastWeekAvailable
    ? measurement === StatsMeasurement.PLAYS
      ? lastWeekMostListenedGenresResponse[0].plays!
      : lastWeekMostListenedGenresResponse[0].playTime!
    : undefined

  return (
    <>
      <ReportSection>
        <section className="flex flex-col items-stretch justify-center gap-2 xl:max-w-[500px] 2xl:w-1/2">
          <StatCard
            label="Most listened genre"
            value={0}
            size="xl"
            contentClassName="text-5xl"
            className="!w-full"
          >
            {thisWeekMostListenedGenre}
          </StatCard>

          {isLastWeekAvailable && (
            <StatCard
              label="Last week's Most listened genre"
              value={0}
              size="xl"
              contentClassName="text-5xl"
              className="!w-full"
            >
              {lastWeekMostListenedGenre}
            </StatCard>
          )}
        </section>

        <section className="xl:w-1/2">
          <Suspense>
            <MostListenedGenresChart
              topGenresResponse={thisWeekMostListenedGenresResponse}
              measurement={measurement}
            />
          </Suspense>
        </section>
      </ReportSection>

      <ReportSection className="flex-col-reverse lg:items-stretch">
        <Suspense>
          <GenresListeningDaysChart
            response={genresListeningDaysResponse}
            measurement={measurement}
          />
        </Suspense>

        <section className="flex w-full flex-col items-stretch xl:max-w-[500px]">
          <StatCard
            size="xl"
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
      </ReportSection>
    </>
  )
}
