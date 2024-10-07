'use client'

import { useState, type HTMLAttributes } from 'react'

import { ProfileAvatar } from './profile-avatar'
import { ShareButton } from './share-button'

import type { Profile, User } from '@app/api/types'
import { SpotifyLink } from '@app/components/common'
import { Button } from '@app/components/ui/button'
import { findImage } from '@app/utils/find-image'
import { useToggleFollowing } from '@app/api/hooks'
import { cn } from '@app/utils/cn'

namespace ProfileCard {
  export type Props = Pick<Profile, 'displayName' | 'images' | 'href'> &
    Pick<User, 'followersCount' | 'followingCount' | 'id'> &
    Pick<HTMLAttributes<HTMLDivElement>, 'children'> & {
      currentUserId: string
      isFollowingUser: boolean
    }
}

function ProfileCard({
  displayName,
  images,
  followersCount,
  followingCount,
  id,
  currentUserId,
  isFollowingUser,
  href,
  children,
}: ProfileCard.Props) {
  const [isFollowingUserOptimistic, setIsFollowingUserOptimistic] =
    useState(isFollowingUser)
  const { toggle } = useToggleFollowing()

  async function handleToggleFollowing() {
    setIsFollowingUserOptimistic(isFollowing => !isFollowing)

    await toggle(isFollowingUserOptimistic)
  }

  return (
    <div className="min-w-[75%]">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div className="flex flex-wrap items-center justify-start gap-4 px-2">
          <ProfileAvatar
            src={images.length > 0 ? findImage(images, 128) : undefined}
            displayName={displayName}
            size="lg"
          />

          <div className="flex h-full flex-col justify-between gap-4">
            <div>
              <div className="text-2xl md:text-3xl">{displayName}</div>

              <div className="flex items-center gap-2 whitespace-nowrap text-lg leading-5 text-foreground">
                <SpotifyLink href={href} />
                <p>{followersCount} Followers</p>&bull;
                <p>{followingCount} Following</p>
              </div>
            </div>

            <div className="items-left flex flex-row gap-2">
              <Button
                variant="outline"
                className={cn(
                  'group hover:bg-white',
                  isFollowingUserOptimistic &&
                    "hover:before:content-['Unfollow']"
                )}
                disabled={id === currentUserId}
                onClick={handleToggleFollowing}
              >
                <span
                  className={cn(
                    isFollowingUserOptimistic && 'group-hover:hidden'
                  )}
                >
                  {isFollowingUserOptimistic ? 'Following' : 'Follow'}
                </span>
              </Button>

              <ShareButton />
            </div>
          </div>
        </div>

        {children}
      </div>
    </div>
  )
}

export { ProfileCard }
