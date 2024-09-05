import { redirect } from 'next/navigation'

import { StatCard } from '../components/cards'
import { validateCursors } from '../helpers'
import { ReportSection } from '../sections'
import type { ProfileReportsPageProps } from '../types/props'

import { StatsMeasurement } from '@app/api/enums'
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
import { getServerToken } from '@app/auth'
import { ItemsList } from '@app/components/items/list'
import { validateId } from '@app/utils/validators'
import { isPublicUser } from '@app/profile/utils/helpers'

export default async function ProfileReportsMostListenedItemsPage({
  params,
  searchParams,
}: ProfileReportsPageProps) {
  const token = await getServerToken()
  const userId = validateId(params.id)

  if (!token && !isPublicUser(userId)) redirect('/')

  const { before: thisWeekBeforeParam, after: thisWeekAfterParam } =
    validateCursors(searchParams.before, searchParams.after)

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
    getRigtchTopArtists(token ?? '', {
      userId,
      before: thisWeekBeforeParam,
      after: thisWeekAfterParam,
      measurement: StatsMeasurement.PLAYS,
    }),
    getRigtchTopAlbums(token ?? '', {
      userId,
      before: thisWeekBeforeParam,
      after: thisWeekAfterParam,
    }),
    getRigtchTopTracks(token ?? '', {
      userId,
      before: thisWeekBeforeParam,
      after: thisWeekAfterParam,
    }),
    getReportsTotalArtists(token ?? '', {
      userId,
      before: thisWeekBeforeParam,
      after: thisWeekAfterParam,
    }),
    getReportsTotalArtists(token ?? '', {
      userId,
      before: new Date(thisWeekBeforeParam.getTime() - 1000 * 60 * 60 * 24 * 7),
      after: new Date(thisWeekAfterParam.getTime() - 1000 * 60 * 60 * 24 * 7),
    }),
    getReportsTotalAlbums(token ?? '', {
      userId,
      before: thisWeekBeforeParam,
      after: thisWeekAfterParam,
    }),
    getReportsTotalAlbums(token ?? '', {
      userId,
      before: new Date(thisWeekBeforeParam.getTime() - 1000 * 60 * 60 * 24 * 7),
      after: new Date(thisWeekAfterParam.getTime() - 1000 * 60 * 60 * 24 * 7),
    }),
    getReportsTotalTracks(token ?? '', {
      userId,
      before: thisWeekBeforeParam,
      after: thisWeekAfterParam,
    }),
    getReportsTotalTracks(token ?? '', {
      userId,
      before: new Date(thisWeekBeforeParam.getTime() - 1000 * 60 * 60 * 24 * 7),
      after: new Date(thisWeekAfterParam.getTime() - 1000 * 60 * 60 * 24 * 7),
    }),
  ])

  if (thisWeekTotalArtists === 0) return null

  return (
    <ReportSection className="grid grid-cols-1 gap-8 2xl:grid-cols-3 2xl:gap-4">
      <section className="flex flex-col gap-4">
        <StatCard
          label="Total artists"
          value={thisWeekTotalArtists}
          lastWeekValue={lastWeekTotalArtists}
          valueSize="xl"
          className="!w-full"
        >
          {thisWeekTotalArtists}
        </StatCard>

        <ItemsList items={mostListenedArtists.slice(0, 5)} isRounded />
      </section>

      <section className="flex flex-col gap-4">
        <StatCard
          label="Total albums"
          value={thisWeekTotalAlbums}
          lastWeekValue={lastWeekTotalAlbums}
          valueSize="xl"
          className="!w-full"
        >
          {thisWeekTotalAlbums}
        </StatCard>

        <ItemsList items={mostListenedAlbums.slice(0, 5)} isRounded />
      </section>

      <section className="flex flex-col gap-4">
        <StatCard
          label="Total tracks"
          value={thisWeekTotalTracks}
          lastWeekValue={lastWeekTotalTracks}
          valueSize="xl"
          className="!w-full"
        >
          {thisWeekTotalTracks}
        </StatCard>

        <ItemsList items={mostListenedTracks.slice(0, 5)} isRounded />
      </section>
    </ReportSection>
  )
}
