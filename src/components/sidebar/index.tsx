'use client'

import { LuDisc3, LuMic2, LuUserCircle } from 'react-icons/lu'
import { usePathname } from 'next/navigation'

import { SidebarSectionItem } from './section-item'

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="bg-primary border-r h-[calc(100vh-60px)] border-primary-lighter p-4 max-w-[300px] hidden md:block top-[60px] sticky">
      <section className="flex flex-col gap-2">
        <header>
          <h2 className="text-xl font-semibold px-2">Profile</h2>
        </header>

        <main>
          <SidebarSectionItem
            href="/profile"
            label="Profile"
            pathname={pathname}
            icon={LuUserCircle}
          />
          <div className="px-4">
            <SidebarSectionItem
              href="/profile/genres"
              label="Top Genres"
              pathname={pathname}
              icon={LuDisc3}
            />
            <SidebarSectionItem
              href="/profile/artists"
              label="Top Artists"
              pathname={pathname}
              icon={LuMic2}
            />
          </div>
        </main>
      </section>
    </aside>
  )
}
