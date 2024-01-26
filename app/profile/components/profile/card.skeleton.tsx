import { PlaybackCard } from '../playback'

import { ProfileAvatarSkeleton } from './avatar.skeleton'

import { Skeleton } from '@app/components/ui/skeleton'
import { OpenInSpotifyButton } from '@app/components/common'
import { Card, CardHeader } from '@app/components/ui/card'

export function ProfileCardSkeleton() {
  return (
    <Card className="min-w-[75%]">
      <CardHeader className="lg:flex-row justify-between lg:items-center gap-8 p-4">
        <div className="flex items-center gap-4 p-4 ">
          <ProfileAvatarSkeleton size="lg" />

          <div className="flex flex-col gap-4">
            <Skeleton className="w-24 h-6" />

            <Skeleton className="w-28 h-4" />

            <div className="flex flex-row gap-2 items-left">
              <OpenInSpotifyButton href={''} />
            </div>
          </div>
        </div>

        <PlaybackCard />
      </CardHeader>
    </Card>
  )
}
