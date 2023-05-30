import { Device } from './device'
import { Track } from './track'

export interface CurrentPlaybackStateQuery {
  currentPlaybackState: PlaybackState
}

export type PlaybackStateDto = Omit<
  PlaybackState,
  'repeatState' | 'shuffleState'
>

export interface PlaybackState {
  device: Device
  repeatState: string
  shuffleState: string
  isPlaying: boolean
  track: Track
}
