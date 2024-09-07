'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

import { ProfileProviders } from '../providers'
import type { ProfileLayoutBaseProps } from '../types'

import { validateId } from '@app/utils/validators'
import { Sidebar } from '@app/components/sidebar'

namespace ProfileLayout {
  export interface Props extends ProfileLayoutBaseProps {
    profile: ReactNode
    analysis: ReactNode
    top: ReactNode
    history: ReactNode
  }
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
      <aside className="sticky top-[65px] hidden h-[calc(100vh-60px)] max-w-[300px] border-r border-primary-lighter bg-primary p-4 lg:block">
        <div className="sticky top-[calc(65px+16px)]">
          <Sidebar />
        </div>
      </aside>

      <main className="my-8 flex min-h-[200vh] w-full flex-col items-stretch justify-start gap-8 md:my-16 md:px-8 xl:px-12">
        <ProfileProviders>
          {profile}
          {isProfileHomePage ? (
            <>
              {top}
              {analysis}
              {history}
            </>
          ) : (
            <>{children}</>
          )}
        </ProfileProviders>
      </main>
    </div>
  )
}

export default ProfileLayout
