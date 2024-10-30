'use client'

import { useParams, usePathname, useSearchParams } from 'next/navigation'
import {
  LuBarChartBig,
  LuClock,
  LuDisc3,
  LuListMusic,
  LuMic2,
  LuMusic,
  LuUserCircle,
} from 'react-icons/lu'

import { SidebarSectionItem } from './sidebar-section-item'

import { useUserQuery } from '@app/api/hooks'
import {
  STATS_MEASUREMENT,
  STATS_PROVIDER,
  TIME_RANGE,
  VIEW,
} from '@app/profile/constants'
import { RigtchTimeRange, StatsProvider } from '@app/profile/enums'
import { isTimeRangeDisabled } from '@app/profile/utils/helpers'
import { validateStatsProvider } from '@app/profile/utils/validators'
import type { ParamsWithId } from '@app/types'

export function Sidebar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { id: userId } = useParams<ParamsWithId>()
  const { data: user } = useUserQuery()

  const view = searchParams.get(VIEW)
  const statsProvider = searchParams.get(STATS_PROVIDER)
  const timeRange = searchParams.get(TIME_RANGE)
  const statsMeasurement = searchParams.get(STATS_MEASUREMENT)

  const profileSearchParams = new URLSearchParams()
  const topGenresSearchParams = new URLSearchParams()
  const topArtistsSearchParams = new URLSearchParams()
  const topAlbumsSearchParams = new URLSearchParams()
  const topTracksSearchParams = new URLSearchParams()
  const reportsSearchParams = new URLSearchParams()

  if (view) {
    profileSearchParams.set(VIEW, view)
    topArtistsSearchParams.set(VIEW, view)
    topAlbumsSearchParams.set(VIEW, view)
    topTracksSearchParams.set(VIEW, view)
  }
  if (statsProvider) {
    profileSearchParams.set(STATS_PROVIDER, statsProvider)
    topArtistsSearchParams.set(STATS_PROVIDER, statsProvider)
    topGenresSearchParams.set(STATS_PROVIDER, statsProvider)
    topTracksSearchParams.set(STATS_PROVIDER, statsProvider)
  }
  if (timeRange) {
    profileSearchParams.set(TIME_RANGE, timeRange)
    topArtistsSearchParams.set(TIME_RANGE, timeRange)
    topGenresSearchParams.set(TIME_RANGE, timeRange)
    if (validateStatsProvider(statsProvider) === StatsProvider.RIGTCH)
      topAlbumsSearchParams.set(TIME_RANGE, timeRange)
    topTracksSearchParams.set(TIME_RANGE, timeRange)
  }
  if (statsMeasurement) {
    profileSearchParams.set(STATS_MEASUREMENT, statsMeasurement)
    topArtistsSearchParams.set(STATS_MEASUREMENT, statsMeasurement)
    topAlbumsSearchParams.set(STATS_MEASUREMENT, statsMeasurement)
    topGenresSearchParams.set(STATS_MEASUREMENT, statsMeasurement)
    topTracksSearchParams.set(STATS_MEASUREMENT, statsMeasurement)
    reportsSearchParams.set(STATS_MEASUREMENT, statsMeasurement)
  }

  return (
    <section className="flex flex-col gap-2">
      <header>
        <h3 className="px-2 text-xl font-semibold">Profile</h3>
      </header>

      <main className="flex flex-col gap-2">
        <SidebarSectionItem
          href={`/profile/${userId}?${profileSearchParams.toString()}`}
          label="Overview"
          pathname={pathname}
          icon={LuUserCircle}
        />

        <section className="flex flex-col gap-2 pl-4">
          <header>
            <h4 className="px-2 text-lg font-semibold">Top</h4>
          </header>

          <main>
            <SidebarSectionItem
              href={`/profile/${userId}/top/genres?${topGenresSearchParams.toString()}`}
              label="Top Genres"
              pathname={pathname}
              icon={LuListMusic}
            />

            <SidebarSectionItem
              href={`/profile/${userId}/top/artists?${topArtistsSearchParams.toString()}`}
              label="Top Artists"
              pathname={pathname}
              icon={LuMic2}
            />

            <SidebarSectionItem
              href={`/profile/${userId}/top/albums?${topAlbumsSearchParams.toString()}`}
              label="Top Albums"
              pathname={pathname}
              icon={LuDisc3}
              isDisabled={
                user?.createdAt &&
                isTimeRangeDisabled(RigtchTimeRange.WEEK, user.createdAt)
              }
            />

            <SidebarSectionItem
              href={`/profile/${userId}/top/tracks?${topTracksSearchParams.toString()}`}
              label="Top Tracks"
              pathname={pathname}
              icon={LuMusic}
            />
          </main>
        </section>

        <SidebarSectionItem
          href={`/profile/${userId}/reports?${reportsSearchParams.toString()}`}
          label="Reports"
          pathname={pathname}
          icon={LuBarChartBig}
        />

        <SidebarSectionItem
          href={`/profile/${userId}/history`}
          label="History"
          pathname={pathname}
          icon={LuClock}
        />
      </main>
    </section>
  )
}
