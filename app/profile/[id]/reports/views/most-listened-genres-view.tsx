import { lazy, Suspense } from 'react'

import { ChartCard, StatCard } from '../components/cards'
import { valueMeasurementFormatter } from '../helpers'
import { ReportSection } from '../sections'

import type { ReportsViewProps } from './types/props'

import { getRigtchTopGenres } from '@app/api/fetchers/stats/rigtch'
import { getReportsGenresListeningDays } from '@app/api/fetchers/reports'
import { StatsMeasurement } from '@app/api/enums'
import { GenresList } from '@app/components/items/genre'

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

export async function MostListenedGenresView({
  token,
  userId,
  measurement,
  cursors: { before, after },
}: ReportsViewProps) {
  const [
    thisWeekMostListenedGenresResponse,
    lastWeekMostListenedGenresResponse,
    genresListeningDaysResponse,
  ] = await Promise.all([
    getRigtchTopGenres(token, {
      userId,
      before,
      after,
      measurement,
      limit: 10,
    }),
    getRigtchTopGenres(token, {
      userId,
      before: new Date(before.getTime() - 1000 * 60 * 60 * 24 * 7),
      after: new Date(after.getTime() - 1000 * 60 * 60 * 24 * 7),
      measurement,
      limit: 5,
    }),
    getReportsGenresListeningDays(token, {
      userId,
      before,
      after,
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
      <h3 className="text-2xl">Genres</h3>
      <ReportSection>
        <section className="flex w-full flex-col items-stretch justify-center gap-2 xl:max-w-[400px]">
          <GenresList
            items={thisWeekMostListenedGenresResponse}
            className="items-stretch xl:flex-col"
          />
        </section>

        <section className="w-full xl:max-h-[532px] xl:max-w-[770px]">
          <ChartCard title="Genres listening days">
            <Suspense>
              <GenresListeningDaysChart
                response={genresListeningDaysResponse}
                measurement={measurement}
              />
            </Suspense>
          </ChartCard>
        </section>
      </ReportSection>

      <ReportSection className="flex-col-reverse lg:items-stretch">
        <ChartCard title="Most listened genres">
          <Suspense>
            <MostListenedGenresChart
              topGenresResponse={thisWeekMostListenedGenresResponse}
              measurement={measurement}
            />
          </Suspense>
        </ChartCard>

        <section className="flex w-full flex-col items-stretch justify-between gap-4 xl:max-w-[500px]">
          <StatCard
            label="Most listened genre"
            value={0}
            size="lg"
            contentClassName="text-5xl"
            className="!w-full"
          >
            {thisWeekMostListenedGenre}
          </StatCard>

          {isLastWeekAvailable && (
            <StatCard
              label="Last week's Most listened genre"
              value={0}
              size="lg"
              contentClassName="text-4xl"
              className="!w-full"
            >
              {lastWeekMostListenedGenre}
            </StatCard>
          )}

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
