'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  FaArrowRightToBracket,
  FaArrowUpRightFromSquare,
} from 'react-icons/fa6'

import { NavigationListItem } from './list-item'

import { Profile } from '@api/types'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from '@components/ui/navigation-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar'
import { ConnectButton } from '@components/connect'

export interface NavigationBarProps {
  profile?: Profile
}

export function NavigationBar({ profile }: NavigationBarProps) {
  return (
    <header className="flex justify-between px-4 py-2 bg-primary">
      <div className="flex items-center gap-4">
        <Image
          src="/rigtch-icon.png"
          alt="Rigtch"
          width={42}
          height={42}
          className="rounded-lg"
        />

        <h1 className="text-2xl font-semibold">Rigtch Music</h1>
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
                  <NavigationListItem className="gap-2">
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

              <Avatar>
                <AvatarImage src={profile.images[0]?.url} />

                <AvatarFallback className="text-black text-xl">
                  {profile.displayName.slice(0, 1)}
                </AvatarFallback>
              </Avatar>
            </>
          ) : (
            <ConnectButton />
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  )
}
