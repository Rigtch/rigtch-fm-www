import { StatCard } from '../components/cards'
import { ReportSection } from '../sections'

import type { ReportsViewProps } from './types/props'

import {
  getReportsTotalAlbums,
  getReportsTotalArtists,
  getReportsTotalTracks,
} from '@app/api/fetchers/reports'
import {
  getRigtchTopAlbums,
  getRigtchTopArtists,
  getRigtchTopTracks,
} from '@app/api/fetchers/stats/rigtch'
import { ItemsList } from '@app/components/items/list'

export async function MostListenedItemsView({
  token,
  userId,
  measurement,
  cursors: { before, after },
}: ReportsViewProps) {
  const [
    mostListenedArtists,
    mostListenedAlbums,
    mostListenedTracks,
    { total: thisWeekTotalArtists },
    { total: lastWeekTotalArtists },
    { total: thisWeekTotalAlbums },
    { total: lastWeekTotalAlbums },
    { total: thisWeekTotalTracks },
    { total: lastWeekTotalTracks },
  ] = await Promise.all([
    getRigtchTopArtists(token, {
      userId,
      before,
      after,
      measurement,
    }),
    getRigtchTopAlbums(token, {
      userId,
      before,
      after,
      measurement,
    }),
    getRigtchTopTracks(token, {
      userId,
      before,
      after,
      measurement,
    }),
    getReportsTotalArtists(token, {
      userId,
      before,
      after,
    }),
    getReportsTotalArtists(token, {
      userId,
      before: new Date(before.getTime() - 1000 * 60 * 60 * 24 * 7),
      after: new Date(after.getTime() - 1000 * 60 * 60 * 24 * 7),
    }),
    getReportsTotalAlbums(token, {
      userId,
      before,
      after,
    }),
    getReportsTotalAlbums(token, {
      userId,
      before: new Date(before.getTime() - 1000 * 60 * 60 * 24 * 7),
      after: new Date(after.getTime() - 1000 * 60 * 60 * 24 * 7),
    }),
    getReportsTotalTracks(token, {
      userId,
      before,
      after,
    }),
    getReportsTotalTracks(token, {
      userId,
      before: new Date(before.getTime() - 1000 * 60 * 60 * 24 * 7),
      after: new Date(after.getTime() - 1000 * 60 * 60 * 24 * 7),
    }),
  ])

  if (thisWeekTotalArtists === 0) return null

  return (
    <>
      <h3 className="text-2xl">Listening hours</h3>
      <ReportSection className="grid grid-cols-1 gap-8 2xl:grid-cols-3 2xl:gap-4">
        <section className="flex flex-col gap-4">
          <StatCard
            label="Total listened artists"
            value={thisWeekTotalArtists}
            lastWeekValue={lastWeekTotalArtists}
            size="xl"
            className="!w-full"
          >
            {thisWeekTotalArtists}
          </StatCard>

          <ItemsList
            items={mostListenedArtists.slice(0, 5)}
            isRounded
            genresDisplayLength={1}
          />
        </section>

        <section className="flex flex-col gap-4">
          <StatCard
            label="Total listened albums"
            value={thisWeekTotalAlbums}
            lastWeekValue={lastWeekTotalAlbums}
            size="xl"
            className="!w-full"
          >
            {thisWeekTotalAlbums}
          </StatCard>

          <ItemsList items={mostListenedAlbums.slice(0, 5)} isRounded />
        </section>

        <section className="flex flex-col gap-4">
          <StatCard
            label="Total listened tracks"
            value={thisWeekTotalTracks}
            lastWeekValue={lastWeekTotalTracks}
            size="xl"
            className="!w-full"
          >
            {thisWeekTotalTracks}
          </StatCard>

          <ItemsList items={mostListenedTracks.slice(0, 5)} isRounded />
        </section>
      </ReportSection>
    </>
  )
}
