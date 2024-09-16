'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { PlaybackCard } from './playback-card'

import { useAuthCookies } from '@app/auth/hooks'
import { usePlaybackStateContext } from '@app/profile/context/playback-state'
import type { ParamsWithId } from '@app/types'

export function Playback() {
  const { data, isPlaying, toggleState } = usePlaybackStateContext()
  const [isPlayingOptimistic, setIsPlayingOptimistic] = useState(isPlaying)
  const { userId } = useAuthCookies()
  const { id: routeUserId } = useParams<ParamsWithId>()

  useEffect(() => {
    setIsPlayingOptimistic(isPlaying)
  }, [isPlaying])

  async function handleToggleState() {
    setIsPlayingOptimistic(isPlaying => !isPlaying)

    await toggleState(isPlaying)
  }

  return (
    <PlaybackCard
      isPlaying={isPlaying}
      isPlayingOptimistic={isPlayingOptimistic}
      track={data?.track}
      device={data?.device}
      userId={userId}
      routeUserId={routeUserId}
      handleToggleState={handleToggleState}
    />
  )
}
