import { TRACK_ID } from '@app/constants'

export interface TrackPageProps {
  params: {
    [TRACK_ID]?: string
  }
}
