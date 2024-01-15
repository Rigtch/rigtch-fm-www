import { PlaybackState, UsersParams } from '../types'

import { fetchApi } from './fetch-api'

export function getPlaybackState(token: string, { userId }: UsersParams) {
  return fetchApi<PlaybackState>(`/users/${userId}/playback/state`, {
    token,
    cache: 'no-cache',
  })
}
