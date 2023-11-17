import { cookies } from 'next/headers'

import { ACCESS_TOKEN } from '@api/constants'
import { getProfile } from '@api/fetchers'
import { LayoutProps } from '@common/types'
import { ProfileCard } from '@components/profile'
import { Sidebar } from '@components/sidebar'

export default async function ProfileLayout({ children }: LayoutProps) {
  const accessToken = cookies().get(ACCESS_TOKEN)?.value

  const profile = await getProfile(accessToken)

  return (
    <div className="flex">
      <Sidebar />

      <main className="my-8 md:my-16 w-full min-h-[200vh] flex flex-col items-stretch justify-start px-4 md:px-12 gap-8">
        <ProfileCard {...profile} />

        {children}
      </main>
    </div>
  )
}
