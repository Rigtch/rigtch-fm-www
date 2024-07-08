'use client'

import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

import { ProfileProviders } from '../providers'
import type { ProfileLayoutBaseProps } from '../types'
import { validateId } from '../../utils/validate-id'

import { ID } from '@app/constants'
import { Sidebar } from '@app/components/sidebar'

export interface ProfileLayoutProps extends ProfileLayoutBaseProps {
  profile: ReactNode
  analysis: ReactNode
  top: ReactNode
  history: ReactNode
}

export default function ProfileLayout({
  children,
  profile,
  analysis,
  top,
  history,
  params,
}: ProfileLayoutProps) {
  const pathname = usePathname()
  const userId = validateId(params[ID])

  const isProfileHomePage = pathname === `/profile/${userId}`

  return (
    <div className="flex">
      <aside className="bg-primary border-r h-[calc(100vh-60px)] border-primary-lighter p-4 max-w-[300px] hidden lg:block top-[65px] sticky">
        <div className="sticky top-[calc(65px+16px)]">
          <Sidebar />
        </div>
      </aside>

      <main className="my-8 md:my-16 w-full min-h-[200vh] flex flex-col items-stretch justify-start px-4 md:px-12 gap-8">
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
