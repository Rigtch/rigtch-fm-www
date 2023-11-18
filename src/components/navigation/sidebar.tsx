'use client'

import { usePathname } from 'next/navigation'
import { LuUserCircle, LuDisc3, LuMic2, LuMusic, LuClock } from 'react-icons/lu'

import { NavigationSidebarSectionItem } from './sidebar-section-item'

export function NavigationSidebar() {
  const pathname = usePathname()

  return (
    <section className="flex flex-col gap-2">
      <header>
        <h3 className="text-xl font-semibold px-2">Profile</h3>
      </header>

      <main className="flex flex-col gap-2">
        <NavigationSidebarSectionItem
          href="/profile"
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
              href="/profile/top/genres"
              label="Top Genres"
              pathname={pathname}
              icon={LuDisc3}
            />

            <NavigationSidebarSectionItem
              href="/profile/top/artists"
              label="Top Artists"
              pathname={pathname}
              icon={LuMic2}
            />
            <NavigationSidebarSectionItem
              href="/profile/top/tracks"
              label="Top Tracks"
              pathname={pathname}
              icon={LuMusic}
            />
          </main>
        </section>

        <NavigationSidebarSectionItem
          href="/profile/recently-played"
          label="Recently Played"
          pathname={pathname}
          icon={LuClock}
        />
      </main>
    </section>
  )
}
