import { PlaybackState } from '../types'

import { fetchApi } from './fetch-api'

export function getPlaybackState(token?: string) {
  return fetchApi<PlaybackState>('/player/state', { token })
}
