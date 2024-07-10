import type { HTMLAttributes } from 'react'

import { ProfileAvatar } from './profile-avatar'
import { ShareButton } from './share-button'

import type { Profile } from '@app/api/types'
import { FollowersCount, SpotifyLink } from '@app/components/common'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@app/components/ui/card'
import { findImage } from '@app/utils/find-image'

export type ProfileCardProps = Pick<
  Profile,
  'displayName' | 'images' | 'followers' | 'href'
> &
  Pick<HTMLAttributes<HTMLDivElement>, 'children'>

export function ProfileCard({
  displayName,
  images,
  followers,
  href,
  children,
}: ProfileCardProps) {
  return (
    <Card className="min-w-[75%]">
      <CardHeader className="lg:flex-row justify-between lg:items-center gap-8 p-4">
        <div className="flex flex-wrap items-center sm:justify-start justify-center gap-4 p-4 ">
          <ProfileAvatar
            src={images.length > 0 ? findImage(images, 128) : undefined}
            displayName={displayName}
            size="lg"
          />

          <div className="flex flex-col gap-4 justify-between h-full">
            <div>
              <CardTitle className="text-2xl md:text-3xl">
                {displayName}
              </CardTitle>

              <CardDescription className="text-lg text-foreground whitespace-nowrap leading-5 flex items-center gap-2">
                <SpotifyLink href={href} />

                <FollowersCount value={followers} />
              </CardDescription>
            </div>

            <div className="flex flex-row gap-2 items-left">
              <ShareButton />
            </div>
          </div>
        </div>

        {children}
      </CardHeader>
    </Card>
  )
}
