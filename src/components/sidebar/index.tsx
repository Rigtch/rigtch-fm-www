import { FaUserCircle, FaStar, FaClock } from 'react-icons/fa'

import { SidebarSectionItem } from './section-item'

export function Sidebar() {
  return (
    <aside className="bg-primary border-r min-h-screen border-primary-lighter p-4 max-w-[300px]">
      <section className="flex flex-col gap-2">
        <header>
          <h2 className="text-xl font-semibold px-2">Profile</h2>
        </header>

        <main>
          <SidebarSectionItem
            isActive
            href="/profile"
            label="Profile"
            icon={FaUserCircle}
          />
          <div className="px-4">
            <SidebarSectionItem
              href="/top-artists"
              label="Top Artists"
              icon={FaStar}
            />
            <SidebarSectionItem
              href="/top-tracks"
              label="Top Tracks"
              icon={FaStar}
            />
            <SidebarSectionItem
              href="/last-tracks"
              label="Last Tracks"
              icon={FaClock}
            />
          </div>
        </main>
      </section>
    </aside>
  )
}
