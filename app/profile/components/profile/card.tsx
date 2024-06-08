'use client'

import { ProfileAvatar } from './avatar'
import { ShareButton } from './share-button'

import { Profile } from '@app/api/types'
import { OpenInSpotifyButton } from '@app/components/common'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@app/components/ui/card'
import { PlaybackCard } from '@app/profile/components/playback'

export function ProfileCard({ displayName, images, followers, href }: Profile) {
  return (
    <Card className="min-w-[75%]">
      <CardHeader className="lg:flex-row justify-between lg:items-center gap-8 p-4">
        <div className="flex flex-wrap items-center md:justify-start justify-center gap-4 p-4 ">
          <ProfileAvatar
            src={images?.[1]?.url}
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

            <div className="flex flex-row gap-2 items-left">
              <OpenInSpotifyButton href={href} className="h-[20px] w-[20px]" />

              <ShareButton />
            </div>
          </div>
        </div>

        <PlaybackCard />
      </CardHeader>
    </Card>
  )
}
