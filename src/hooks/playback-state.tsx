import { useContext } from 'react'

import { PlaybackStateContext } from '~/context/playback-state'
import { getImage } from '~/utils/get-image'
import { getArtists } from '~/utils/get-artists'

export const usePlaybackState = () => {
  const playbackStateContext = useContext(PlaybackStateContext)

  const getPlaybackAlbumImage = (index = 0) =>
    getImage(playbackStateContext.track?.album.images, index)

  const getPlaybackArtists = () =>
    getArtists(playbackStateContext.track?.artists)

  return {
    ...playbackStateContext,
    getPlaybackArtists,
    getPlaybackAlbumImage,
  }
}
