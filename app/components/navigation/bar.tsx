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

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from '../ui/navigation-menu'
import { ConnectButton } from '../connect'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { ProfileAvatar } from '../../profile/components/profile'

import { NavigationSidebar } from './sidebar'
import { NavigationListItem } from './list-item'

import { Profile } from '@app/api/types'
import { useAuthCookies } from '@app/hooks/use-auth-cookies'

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

        <h1 className="text-2xl md:text-3xl md:block hidden font-semibold">
          rigtch.fm
        </h1>
      </div>

      <NavigationMenu className="w-full">
        <NavigationMenuList>
          {profile ? (
            <>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="flex gap-2 p-2 min-w-[100px]">
                  <p className="text-lg truncate max-w-[150px]">
                    {profile.displayName}
                  </p>
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
                src={profile.images?.[0]?.url}
                className="hidden md:block"
                displayName={profile.displayName}
              />

              <div className="md:hidden">
                <Sheet
                  open={isSidebarOpen}
                  onOpenChange={isOpen => {
                    setIsSidebarOpen(isOpen)
                  }}
                >
                  <SheetTrigger
                    onClick={() => {
                      setIsSidebarOpen(true)
                    }}
                    className="cursor-pointer"
                  >
                    <ProfileAvatar
                      src={profile.images?.[0]?.url}
                      className="items-center"
                      displayName={profile.displayName}
                    />
                  </SheetTrigger>

                  <SheetContent>
                    <NavigationSidebar />
                  </SheetContent>
                </Sheet>
              </div>
            </>
          ) : (
            <ConnectButton variant="success" />
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  )
}
