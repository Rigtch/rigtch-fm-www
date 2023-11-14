'use client'

import { OpenInSpotifyButton } from '../common/open-in-spotify-button'

import { Avatar, AvatarImage, AvatarFallback } from '@components/ui/avatar'
import { Profile } from '@api/types'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@components/ui/card'

export type ProfileCardProps = Profile

export default function ProfileCard({
  displayName,
  images,
  followers,
  href,
}: ProfileCardProps) {
  return (
    <Card className="w-1/2">
      <CardHeader className="flex-row items-center gap-3">
        <Avatar className="w-32 h-32">
          <AvatarImage src={images[1]?.url} />

          <AvatarFallback className="bg-neutral-700 text-5xl">
            {displayName.slice(0, 1)}
          </AvatarFallback>
        </Avatar>

        <div className="flex-col">
          <CardTitle className="text-2xl">{displayName}</CardTitle>

          <CardDescription className="text-lg">
            {followers} Followers
          </CardDescription>

          <CardFooter className="flex items-left">
            <OpenInSpotifyButton href={href} />
          </CardFooter>
        </div>
      </CardHeader>
    </Card>
  )
}
