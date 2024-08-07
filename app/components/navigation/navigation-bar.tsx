'use client'

import { useQueryClient } from '@tanstack/react-query'
import type { User } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  FaArrowRightToBracket,
  FaArrowUpRightFromSquare,
} from 'react-icons/fa6'
import { IoClose } from 'react-icons/io5'
import { LuUserCircle } from 'react-icons/lu'
import { RxHamburgerMenu } from 'react-icons/rx'

import { ConnectButton } from '../auth'
import { Sidebar } from '../sidebar'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../ui/navigation-menu'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'

import { NavigationListItem } from './navigation-list-item'

import { handleSignOut } from '@app/auth/actions'
import { ProfileAvatar } from '@app/profile/components/profile'

namespace NavigationBar {
  export interface Props {
    user?: User
    userId?: string
  }
}

function NavigationBar({ user, userId }: NavigationBar.Props) {
  const queryClient = useQueryClient()
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    setIsSidebarOpen(false)
  }, [pathname])

  async function disconnect() {
    queryClient.clear()

    await handleSignOut()
  }

  return (
    <header className="flex justify-between px-4 py-2 bg-primary border-b border-primary-lighter top-0 sticky z-10">
      <div className="flex items-center gap-4">
        <Image
          src="/rigtch-icon.png"
          alt="Rigtch"
          width={42}
          height={42}
          className="rounded-lg hidden lg:block"
        />

        <div className="lg:hidden w-[28px] h-[28px]">
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
              {isSidebarOpen ? (
                <IoClose size={28} />
              ) : (
                <RxHamburgerMenu size={28} />
              )}
            </SheetTrigger>

            <SheetContent side="bottom">
              <div className="min-h-[50vh]">
                <Sidebar />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <h1 className="text-2xl md:text-3xl md:block hidden font-semibold">
          rigtch.fm
        </h1>
      </div>

      <NavigationMenu className="w-full">
        <NavigationMenuList>
          {user?.name ? (
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

                  <form action={disconnect}>
                    <button type="submit" className="w-full">
                      <NavigationListItem className="gap-2">
                        <FaArrowRightToBracket />
                        Disconnect
                      </NavigationListItem>
                    </button>
                  </form>

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

              <Link href={`/profile/${userId}`}>
                <ProfileAvatar src={user.image} displayName={user.name} />
              </Link>
            </>
          ) : (
            <ConnectButton variant="success" />
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  )
}

export { NavigationBar }
