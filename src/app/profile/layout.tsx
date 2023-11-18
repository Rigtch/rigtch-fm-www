import { cookies } from 'next/headers'

import '@app/audio-bars.css'

import { ACCESS_TOKEN } from '@api/constants'
import { getProfile } from '@api/fetchers'
import { LayoutProps } from '@common/types'
import { ProfileCard } from '@components/profile'
import { NavigationSidebar } from '@components/navigation'

export default async function ProfileLayout({ children }: LayoutProps) {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value

  const profile = await getProfile(accessToken)

  return (
    <div className="flex">
      <aside className="bg-primary border-r h-[calc(100vh-60px)] border-primary-lighter p-4 max-w-[300px] hidden md:block top-[60px] sticky">
        <NavigationSidebar />
      </aside>

      <main className="my-8 md:my-16 w-full min-h-[200vh] flex flex-col items-stretch justify-start px-4 md:px-12 gap-8">
        <ProfileCard {...profile} />

        {children}
      </main>
    </div>
  )
}
