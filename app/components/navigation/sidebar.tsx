'use client'

import { useParams, usePathname, useSearchParams } from 'next/navigation'
import { LuUserCircle, LuDisc3, LuMic2, LuMusic, LuClock } from 'react-icons/lu'

import { NavigationSidebarSectionItem } from './sidebar-section-item'

import { USER_ID } from '@app/constants'

export function NavigationSidebar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const params = useParams()

  const userId = params[USER_ID].toString()

  return (
    <section className="flex flex-col gap-2">
      <header>
        <h3 className="text-xl font-semibold px-2">Profile</h3>
      </header>

      <main className="flex flex-col gap-2">
        <NavigationSidebarSectionItem
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
            <NavigationSidebarSectionItem
              href={`/profile/${userId}/top/genres?${searchParams.toString()}`}
              label="Top Genres"
              pathname={pathname}
              icon={LuDisc3}
            />

            <NavigationSidebarSectionItem
              href={`/profile/${userId}/top/artists?${searchParams.toString()}`}
              label="Top Artists"
              pathname={pathname}
              icon={LuMic2}
            />
            <NavigationSidebarSectionItem
              href={`/profile/${userId}/top/tracks?${searchParams.toString()}`}
              label="Top Tracks"
              pathname={pathname}
              icon={LuMusic}
            />
          </main>
        </section>

        <NavigationSidebarSectionItem
          href={`/profile/${userId}/history`}
          label="History"
          pathname={pathname}
          icon={LuClock}
        />
      </main>
    </section>
  )
}
