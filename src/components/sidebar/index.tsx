'use client'

import { FaUserCircle, FaStar, FaClock } from 'react-icons/fa'
import { usePathname } from 'next/navigation'

import { SidebarSectionItem } from './section-item'

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="bg-primary border-r min-h-screen border-primary-lighter p-4 max-w-[300px] hidden md:block">
      <section className="flex flex-col gap-2">
        <header>
          <h2 className="text-xl font-semibold px-2">Profile</h2>
        </header>

        <main>
          <SidebarSectionItem
            href="/profile"
            label="Profile"
            pathname={pathname}
            icon={FaUserCircle}
          />
          <div className="px-4">
            <SidebarSectionItem
              href="/top-artists"
              label="Top Artists"
              pathname={pathname}
              icon={FaStar}
            />
            <SidebarSectionItem
              href="/top-tracks"
              label="Top Tracks"
              pathname={pathname}
              icon={FaStar}
            />
            <SidebarSectionItem
              href="/last-tracks"
              label="Last Tracks"
              pathname={pathname}
              icon={FaClock}
            />
          </div>
        </main>
      </section>
    </aside>
  )
}
