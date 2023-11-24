import { Device } from './device'
import { Track } from './track'

export interface PlaybackState {
  device: Device
  repeatState: string
  shuffleState: boolean
  isPlaying: boolean
  track: Track
}
