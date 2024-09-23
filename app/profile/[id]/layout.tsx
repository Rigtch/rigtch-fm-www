'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

import { ProfileProviders } from '../providers'
import type { ProfileLayoutBaseProps } from '../types'

import { validateId } from '@app/utils/validators'
import { Sidebar } from '@app/components/sidebar'

namespace ProfileLayout {
  export type Props = Readonly<
    ProfileLayoutBaseProps & {
      profile: ReactNode
      analysis: ReactNode
      top: ReactNode
      history: ReactNode
    }
  >
}

function ProfileLayout({
  children,
  profile,
  analysis,
  top,
  history,
  params,
}: ProfileLayout.Props) {
  const pathname = usePathname()
  const userId = validateId(params.id)

  const isProfileHomePage = pathname === `/profile/${userId}`

  return (
    <div className="flex">
      <aside className="sticky top-[65px] hidden h-[calc(100vh-60px)] max-w-[300px] border-r border-primary-lighter bg-primary p-4 lg:block lg:max-w-[250px]">
        <div className="sticky top-[calc(65px+16px)]">
          <Sidebar />
        </div>
      </aside>

      <main className="my-4 flex min-h-screen w-full flex-col items-stretch justify-start gap-6 px-2 md:my-6 md:px-4 xl:my-8 xl:px-8">
        <ProfileProviders>
          {profile}
          {isProfileHomePage ? (
            <>
              {children}
              {top}
              {analysis}
              {history}
            </>
          ) : (
            children
          )}
        </ProfileProviders>
      </main>
    </div>
  )
}

export default ProfileLayout
