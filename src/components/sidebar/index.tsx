'use client'

import { LuDisc3, LuMic2, LuUserCircle, LuClock, LuMusic } from 'react-icons/lu'
import { usePathname } from 'next/navigation'

import { SidebarSectionItem } from './section-item'

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="bg-primary border-r h-[calc(100vh-60px)] border-primary-lighter p-4 max-w-[300px] hidden md:block top-[60px] sticky">
      <section className="flex flex-col gap-2">
        <header>
          <h3 className="text-xl font-semibold px-2">Profile</h3>
        </header>

        <main className="flex flex-col gap-2">
          <SidebarSectionItem
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
              <SidebarSectionItem
                href="/profile/top/genres"
                label="Top Genres"
                pathname={pathname}
                icon={LuDisc3}
              />

              <SidebarSectionItem
                href="/profile/top/artists"
                label="Top Artists"
                pathname={pathname}
                icon={LuMic2}
              />
              <SidebarSectionItem
                href="/profile/top/tracks"
                label="Top Tracks"
                pathname={pathname}
                icon={LuMusic}
              />
            </main>
          </section>

          <SidebarSectionItem
            href="/profile/recently-played"
            label="Recently Played"
            pathname={pathname}
            icon={LuClock}
          />
        </main>
      </section>
    </aside>
  )
}
