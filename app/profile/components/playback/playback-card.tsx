'use client'

import { AudioBars } from './audio-bars'
import { ToggleStateButton } from './toggle-state-button'

import type { Device, Track } from '@app/api/types'
import { SpotifyLink } from '@app/components/common'
import { ItemImage, RelativeTime } from '@app/components/items/misc'
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@app/components/ui/card'
import { Skeleton } from '@app/components/ui/skeleton'
import { cn } from '@app/utils/cn'
import { formatArtists } from '@app/utils/formatters'

namespace PlaybackCard {
  export type Props = Readonly<{
    isPlaying?: boolean
    isPlayingOptimistic?: boolean
    track?: Track
    device?: Device
    userId?: string
    routeUserId?: string
    handleToggleState: () => Promise<void>
  }>
}

function PlaybackCard({
  isPlaying = false,
  isPlayingOptimistic = false,
  track,
  device,
  userId,
  routeUserId,
  handleToggleState,
}: PlaybackCard.Props) {
  return (
    <Card
      className={cn(
        '!m-0 h-full min-w-[300px] overflow-hidden p-2 lg:min-w-[400px]',
        isPlayingOptimistic ? 'border-success bg-success' : 'bg-neutral-800/50'
      )}
    >
      <CardHeader className="flex w-full flex-row gap-2 space-y-0 p-0">
        {track ? (
          <ItemImage
            images={track}
            size={96}
            alt={track.album.name}
            className={'h-24 w-24 flex-shrink-0 rounded-md'}
          />
        ) : (
          <Skeleton className="h-24 w-24 flex-shrink-0" />
        )}

        <div className="flex min-w-0 flex-grow flex-col justify-between">
          <CardTitle className="flex flex-col overflow-hidden font-normal">
            {track ? (
              <>
                <p className="truncate text-xl">{track.name}</p>
                <p className="truncate text-sm text-neutral-300">
                  {formatArtists(track.artists)}
                </p>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Skeleton className="h-7 w-48" />
                <Skeleton className="h-4 w-24" />
              </div>
            )}
          </CardTitle>

          <CardFooter className="flex items-stretch justify-between p-0">
            <div className="flex items-center gap-2">
              <ToggleStateButton
                isPlaying={isPlayingOptimistic}
                isDeviceAvailable={!!device}
                hasAccess={routeUserId === userId}
                toggleState={handleToggleState}
              />

              {isPlaying && <AudioBars />}
            </div>

            <div className="flex min-w-max flex-row items-end gap-2">
              {!device && track?.playedAt && (
                <RelativeTime value={track.playedAt} />
              )}

              <SpotifyLink href={track?.href} isDisabled={!track} />
            </div>
          </CardFooter>
        </div>
      </CardHeader>
    </Card>
  )
}

export { PlaybackCard }
