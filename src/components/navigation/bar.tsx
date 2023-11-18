'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  FaArrowRightToBracket,
  FaArrowUpRightFromSquare,
} from 'react-icons/fa6'
import { useQueryClient } from '@tanstack/react-query'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { NavigationListItem } from './list-item'
import { NavigationSidebar } from './sidebar'

import { Profile } from '@api/types'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from '@components/ui/navigation-menu'
import { ConnectButton } from '@components/connect'
import { useAuthCookies } from '@hooks/use-auth-cookies'
import { Sheet, SheetContent, SheetTrigger } from '@components/ui/sheet'
import { ProfileAvatar } from '@components/profile'

export interface NavigationBarProps {
  profile?: Profile
}

export function NavigationBar({ profile }: NavigationBarProps) {
  const { removeAuthCookies } = useAuthCookies()
  const queryClient = useQueryClient()
  const router = useRouter()
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    setIsSidebarOpen(false)
  }, [pathname])

  function disconnect() {
    removeAuthCookies()

    queryClient.clear()

    router.push('/')
    router.refresh()
  }

  return (
    <header className="flex justify-between px-4 py-2 bg-primary border-b border-primary-lighter top-0 sticky z-10">
      <div className="flex items-center gap-4">
        <Image
          src="/rigtch-icon.png"
          alt="Rigtch"
          width={42}
          height={42}
          className="rounded-lg"
        />

        <h1 className="text-xl md:text-2xl font-semibold">Rigtch Music</h1>
      </div>

      <NavigationMenu className="w-full">
        <NavigationMenuList>
          {profile ? (
            <>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="flex gap-2 p-2">
                  <p className="text-lg">{profile.displayName}</p>
                </NavigationMenuTrigger>

                <NavigationMenuContent>
                  <NavigationListItem className="gap-2" onClick={disconnect}>
                    <FaArrowRightToBracket />
                    Disconnect
                  </NavigationListItem>

                  <NavigationListItem href="/profile" asChild className="gap-2">
                    <Link href={profile.href} replace target="_blank">
                      <FaArrowUpRightFromSquare />
                      Open in Spotify
                    </Link>
                  </NavigationListItem>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <ProfileAvatar
                src={profile.images[0]?.url}
                className="hidden md:block"
                fallback={profile.displayName.slice(0, 1)}
              />

              <div className="md:hidden">
                <Sheet
                  open={isSidebarOpen}
                  onOpenChange={isOpen => setIsSidebarOpen(isOpen)}
                >
                  <SheetTrigger asChild onClick={() => setIsSidebarOpen(true)}>
                    <ProfileAvatar
                      src={profile.images[0]?.url}
                      className="items-center"
                      fallback={profile.displayName.slice(0, 1)}
                    />
                  </SheetTrigger>

                  <SheetContent>
                    <NavigationSidebar />
                  </SheetContent>
                </Sheet>
              </div>
            </>
          ) : (
            <ConnectButton />
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  )
}
