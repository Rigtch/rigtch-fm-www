'use client'

import Image from 'next/image'
import Link from 'next/link'

import { NavigationListItemLink, NavigationListItem } from './list'

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
  console.log(profile)

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
          <NavigationMenuItem>
            <Link href="/profile">
              <NavigationMenuTrigger>Profile</NavigationMenuTrigger>
            </Link>

            <NavigationMenuContent>
              <ul>
                <NavigationListItemLink
                  href="/top-artists"
                  label="Top Artists"
                />
                <NavigationListItemLink href="/top-tracks" label="Top Tracks" />
                <NavigationListItemLink
                  href="/last-tracks"
                  label="Last Tracks"
                />
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {profile ? (
            <>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="flex gap-2 p-2">
                  <p className="text-lg">{profile.displayName}</p>
                </NavigationMenuTrigger>

                <NavigationMenuContent>
                  <ul>
                    <NavigationListItem label="Disconnect" />
                    <NavigationListItemLink
                      href={profile.href}
                      label="Open in Spotify"
                      replace
                      target="_blank"
                    />
                  </ul>
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
