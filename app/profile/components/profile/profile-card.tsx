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

namespace ProfileCard {
  export type Props = Pick<
    Profile,
    'displayName' | 'images' | 'followers' | 'href'
  > &
    Pick<HTMLAttributes<HTMLDivElement>, 'children'>
}

function ProfileCard({
  displayName,
  images,
  followers,
  href,
  children,
}: ProfileCard.Props) {
  return (
    <Card className="min-w-[75%]">
      <CardHeader className="justify-between gap-8 p-4 lg:flex-row lg:items-center">
        <div className="flex flex-wrap items-center justify-center gap-4 p-4 sm:justify-start">
          <ProfileAvatar
            src={images.length > 0 ? findImage(images, 128) : undefined}
            displayName={displayName}
            size="lg"
          />

          <div className="flex h-full flex-col justify-between gap-4">
            <div>
              <CardTitle className="text-2xl md:text-3xl">
                {displayName}
              </CardTitle>

              <CardDescription className="flex items-center gap-2 whitespace-nowrap text-lg leading-5 text-foreground">
                <SpotifyLink href={href} />

                <FollowersCount value={followers} />
              </CardDescription>
            </div>

            <div className="items-left flex flex-row gap-2">
              <ShareButton />
            </div>
          </div>
        </div>

        {children}
      </CardHeader>
    </Card>
  )
}

export { ProfileCard }
