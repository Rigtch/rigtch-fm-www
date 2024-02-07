'use client'

import '@app/audio-bars.css'

import { ReactNode } from 'react'

import { ProfileProviders } from '../providers'

import { LayoutProps } from '@app/types'
import { NavigationSidebar } from '@app/components/navigation'

export interface ProfileLayoutProps extends LayoutProps {
  profile: ReactNode
}

export default function ProfileLayout({
  children,
  profile,
}: ProfileLayoutProps) {
  return (
    <div className="flex">
      <aside className="bg-primary border-r h-[calc(100vh-60px)] border-primary-lighter p-4 max-w-[300px] hidden lg:block top-[60px] sticky">
        <NavigationSidebar />
      </aside>

      <main className="my-8 md:my-16 w-full min-h-[200vh] flex flex-col items-stretch justify-start px-4 md:px-12 gap-8">
        <ProfileProviders>
          {profile}
          {children}
        </ProfileProviders>
      </main>
    </div>
  )
}
