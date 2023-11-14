'use client'

import { OpenInSpotifyButton } from '@components/common'
import { Avatar, AvatarImage, AvatarFallback } from '@components/ui/avatar'
import { Profile } from '@api/types'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card'
import { PlaybackCard } from '@components/playback'

export function ProfileCard({ displayName, images, followers, href }: Profile) {
  return (
    <Card className="min-w-[50%]">
      <CardHeader className="flex-row items-between gap-8">
        <div className="flex items-center gap-4">
          <Avatar className="w-32 h-32">
            <AvatarImage src={images[1]?.url} />

            <AvatarFallback className="bg-neutral-700 text-5xl">
              {displayName.slice(0, 1)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-col">
            <CardTitle className="text-2xl">{displayName}</CardTitle>

            <CardDescription className="text-lg whitespace-nowrap">
              {followers} Followers
            </CardDescription>

            <CardFooter className="flex items-left">
              <OpenInSpotifyButton href={href} />
            </CardFooter>
          </div>
        </div>

        <PlaybackCard />
      </CardHeader>
    </Card>
  )
}
