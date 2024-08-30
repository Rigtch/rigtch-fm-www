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

import { STATS_PROVIDER, VIEW } from '@app/profile/constants'
import { StatsProvider } from '@app/profile/enums'
import type { ParamsWithId } from '@app/types'
import { formatSearchParams } from '@app/utils/formatters'

export function Sidebar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { id: userId } = useParams<ParamsWithId>()

  const view = searchParams.get(VIEW)

  return (
    <section className="flex flex-col gap-2">
      <header>
        <h3 className="text-xl font-semibold px-2">Profile</h3>
      </header>

      <main className="flex flex-col gap-2">
        <SidebarSectionItem
          href={`/profile/${userId}?${searchParams.toString()}`}
          label="Overview"
          pathname={pathname}
          icon={LuUserCircle}
        />

        <section className="pl-4 flex flex-col gap-2">
          <header>
            <h4 className="text-lg font-semibold px-2">Top</h4>
          </header>

          <main>
            <SidebarSectionItem
              href={`/profile/${userId}/top/genres?${searchParams.toString()}`}
              label="Top Genres"
              pathname={pathname}
              icon={LuListMusic}
            />

            <SidebarSectionItem
              href={`/profile/${userId}/top/artists?${searchParams.toString()}`}
              label="Top Artists"
              pathname={pathname}
              icon={LuMic2}
            />

            <SidebarSectionItem
              href={`/profile/${userId}/top/albums?${formatSearchParams(
                view ? new URLSearchParams({ [VIEW]: view }) : searchParams,
                STATS_PROVIDER,
                StatsProvider.RIGTCH
              )}`}
              label="Top Albums"
              pathname={pathname}
              icon={LuDisc3}
            />

            <SidebarSectionItem
              href={`/profile/${userId}/top/tracks?${searchParams.toString()}`}
              label="Top Tracks"
              pathname={pathname}
              icon={LuMusic}
            />
          </main>
        </section>

        <SidebarSectionItem
          href={`/profile/${userId}/reports`}
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
