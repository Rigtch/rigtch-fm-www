import { PlaybackState } from '../types'

import { fetchApi } from './fetch-api'

export function getPlaybackState(token?: string) {
  try {
    return fetchApi<PlaybackState>('/player/state', {
      token,
      cache: 'no-cache',
    })
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === 'No device is currently playing'
    ) {
      return
    }
  }
}
