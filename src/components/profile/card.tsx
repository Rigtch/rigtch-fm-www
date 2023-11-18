'use client'

import { ProfileAvatar } from './avatar'

import { OpenInSpotifyButton } from '@components/common'
import { Profile } from '@api/types'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@components/ui/card'
import { PlaybackCard } from '@components/playback'

export function ProfileCard({ displayName, images, followers, href }: Profile) {
  return (
    <Card className="min-w-[75%]">
      <CardHeader className="lg:flex-row justify-between lg:items-center gap-8 p-4">
        <div className="flex items-center gap-4 p-4 ">
          <ProfileAvatar
            src={images[1]?.url}
            displayName={displayName}
            size="lg"
          />

          <div className="flex flex-col gap-4">
            <div>
              <CardTitle className="text-2xl md:text-3xl">
                {displayName}
              </CardTitle>

              <CardDescription className="text-lg whitespace-nowrap leading-5">
                {followers} Followers
              </CardDescription>
            </div>

            <div className="flex items-left">
              <OpenInSpotifyButton href={href} />
            </div>
          </div>
        </div>

        <PlaybackCard />
      </CardHeader>
    </Card>
  )
}
