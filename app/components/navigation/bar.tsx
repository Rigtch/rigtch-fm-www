'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  FaArrowRightToBracket,
  FaArrowUpRightFromSquare,
} from 'react-icons/fa6'
import { useQueryClient } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { signOut } from 'next-auth/react'
import { LuUserCircle } from 'react-icons/lu'

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from '../ui/navigation-menu'
import { ConnectButton } from '../connect'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'

import { NavigationSidebar } from './sidebar'
import { NavigationListItem } from './list-item'

import { ProfileAvatar } from '@app/profile/components/profile'
import { useAuthCookies } from '@app/hooks/use-auth-cookies'
import { useCurrentUser } from '@app/hooks/use-current-user'

export function NavigationBar() {
  const { userId, removeAuthCookies } = useAuthCookies()
  const queryClient = useQueryClient()
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const user = useCurrentUser()

  useEffect(() => {
    setIsSidebarOpen(false)
  }, [pathname])

  async function disconnect() {
    queryClient.clear()

    await removeAuthCookies()
    await signOut({ callbackUrl: '/', redirect: true })
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
          {user ? (
            <>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="flex gap-2 p-2 min-w-[100px]">
                  <p className="text-lg truncate max-w-[150px]">{user.name}</p>
                </NavigationMenuTrigger>

                <NavigationMenuContent>
                  <NavigationListItem asChild className="gap-2">
                    <Link href={`/profile/${userId}`}>
                      <LuUserCircle />
                      My Profile
                    </Link>
                  </NavigationListItem>

                  <NavigationListItem className="gap-2" onClick={disconnect}>
                    <FaArrowRightToBracket />
                    Disconnect
                  </NavigationListItem>

                  <NavigationListItem asChild className="gap-2">
                    <Link
                      href={`https://open.spotify.com/user/${user.id}`}
                      replace
                      target="_blank"
                    >
                      <FaArrowUpRightFromSquare />
                      Open in Spotify
                    </Link>
                  </NavigationListItem>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <ProfileAvatar
                className="hidden md:block"
                src={user.image}
                displayName={user.name}
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
                      className="items-center"
                      src={user.image}
                      displayName={user.name}
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
