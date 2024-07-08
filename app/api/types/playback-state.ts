import type { Device } from './device'
import type { Track } from './track'

export interface PlaybackState {
  device: Device
  repeatState: string
  shuffleState: boolean
  isPlaying: boolean
  track: Track
}
