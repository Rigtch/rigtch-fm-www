'use client'

import Image from 'next/image'
import { useState } from 'react'

import { PlaybackCardSkeleton } from './card.skeleton'
import { PlaybackStateToggleButton } from './state-toggle-button'

import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@app/components/ui/card'
import { AudioBars, OpenInSpotifyButton } from '@app/components/common'
import { Skeleton } from '@app/components/ui/skeleton'
import { usePlaybackStateContext } from '@app/context/playback-state'
import { cn } from '@app/utils/cn'
import { formatArtists } from '@app/utils/formatters'

export function PlaybackCard() {
  const { data, isPlaying, toggleState } = usePlaybackStateContext()
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  if (!data?.track) return <PlaybackCardSkeleton />

  const {
    device,
    track: { album, ...track },
  } = data

  return (
    <Card className="bg-success border-success p-4 w-full h-full items-center !m-0 lg:w-[380px] xl:min-w-[380px] xl:w-2/5">
      <CardHeader className="flex flex-col sm:flex-row gap-4 p-0 w-full space-y-0">
        <Image
          src={album.images[0].url}
          width={96}
          height={96}
          alt={album.name}
          className={cn(
            'rounded-md w-full sm:w-auto',
            isImageLoaded ? 'opacity-100' : 'opacity-0'
          )}
          onLoad={() => setIsImageLoaded(true)}
        />

        {!isImageLoaded && <Skeleton className="h-[128px] w-[128px]" />}

        <div className="flex flex-col justify-between w-full lg:max-w-[calc(100%-142px)] gap-4 md:gap-0">
          <CardTitle className="whitespace-nowrap font-normal flex flex-col gap-1">
            <p className="text-2xl inline-block text-ellipsis overflow-hidden whitespace-nowrap">
              {track.name}
            </p>

            <p className="text-neutral-300">{formatArtists(track.artists)}</p>
          </CardTitle>

          <CardFooter className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <AudioBars isPlaying={isPlaying} />

              <PlaybackStateToggleButton
                isPlaying={isPlaying}
                isDeviceAvailable={!!device}
                toggleState={toggleState}
              />
            </div>

            <OpenInSpotifyButton href={track.href} />
          </CardFooter>
        </div>
      </CardHeader>
    </Card>
  )
}
