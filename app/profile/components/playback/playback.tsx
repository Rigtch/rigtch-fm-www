'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { PlaybackCardSkeleton } from './playback-card.skeleton'
import { PlaybackCard } from './playback-card'

import { USER_ID } from '@app/constants'
import { useAuthCookies } from '@app/hooks/use-auth-cookies'
import { usePlaybackStateContext } from '@app/profile/context/playback-state'

export function Playback() {
  const { data, isPlaying, toggleState } = usePlaybackStateContext()
  const [isPlayingOptimistic, setIsPlayingOptimistic] = useState(isPlaying)
  const { userId } = useAuthCookies()
  const params = useParams()

  const routeUserId = params[USER_ID].toString()

  useEffect(() => {
    setIsPlayingOptimistic(isPlaying)
  }, [isPlaying])

  if (!data?.track) return <PlaybackCardSkeleton />

  const { device, track } = data

  async function handleToggleState() {
    setIsPlayingOptimistic(isPlaying => !isPlaying)

    await toggleState(isPlaying)
  }

  return (
    <PlaybackCard
      isPlaying={isPlaying}
      isPlayingOptimistic={isPlayingOptimistic}
      track={track}
      device={device}
      userId={userId}
      routeUserId={routeUserId}
      handleToggleState={handleToggleState}
    />
  )
}
