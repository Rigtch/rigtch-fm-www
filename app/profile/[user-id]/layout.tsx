'use client'

import '@app/audio-bars.css'

import { ReactNode } from 'react'
import { usePathname } from 'next/navigation'

import { ProfileProviders } from '../providers'
import { ProfileLayoutBaseProps } from '../types'

import { NavigationSidebar } from '@app/components/navigation'
import { USER_ID } from '@app/constants'
import { validateUserId } from '@app/utils/user-id'

export interface ProfileLayoutProps extends ProfileLayoutBaseProps {
  profile: ReactNode
  analysis: ReactNode
  top: ReactNode
  recentlyPlayed: ReactNode
}

export default function ProfileLayout({
  children,
  profile,
  analysis,
  top,
  recentlyPlayed,
  params,
}: ProfileLayoutProps) {
  const pathname = usePathname()
  const userId = validateUserId(params[USER_ID])

  const isProfileHomePage = pathname === `/profile/${userId}`

  return (
    <div className="flex">
      <aside className="bg-primary border-r h-[calc(100vh-60px)] border-primary-lighter p-4 max-w-[300px] hidden lg:block top-[60px] sticky">
        <NavigationSidebar />
      </aside>

      <main className="my-8 md:my-16 w-full min-h-[200vh] flex flex-col items-stretch justify-start px-4 md:px-12 gap-8">
        <ProfileProviders>
          {profile}
          {isProfileHomePage && (
            <>
              {top}
              {analysis}
              {recentlyPlayed}
            </>
          )}
          {children}
        </ProfileProviders>
      </main>
    </div>
  )
}
