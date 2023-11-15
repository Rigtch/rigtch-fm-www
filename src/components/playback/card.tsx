'use client'

import Image from 'next/image'
import { useState } from 'react'

import { PlaybackStateToggleButton } from './state-toggle-button'
import { PlaybackCardSkeleton } from './card.skeleton'

import { Card, CardFooter, CardHeader, CardTitle } from '@components/ui/card'
import { usePlaybackStateContext } from '@context/playback-state'
import { formatArtists } from '@utils/formatters'
import { AudioBars, OpenInSpotifyButton } from '@components/common'
import { Skeleton } from '@components/ui/skeleton'
import { cn } from '@utils/cn'

export function PlaybackCard() {
  const { data, isPlaying, toggleState } = usePlaybackStateContext()
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  if (!data) return <PlaybackCardSkeleton />

  const {
    device,
    track: { album, ...track },
  } = data

  return (
    <Card className="bg-success border-success p-4 w-full h-full items-center !m-0 lg:w-[380px] xl:min-w-[380px]">
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
          onLoadingComplete={() => setIsImageLoaded(true)}
        />

        {!isImageLoaded && <Skeleton className="h-[128px] w-[128px]" />}

        <div className="flex flex-col justify-between w-full gap-4 md:gap-0">
          <CardTitle className="whitespace-nowrap w-full font-normal flex flex-col gap-1">
            <p className="text-2xl">{track.name}</p>
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
