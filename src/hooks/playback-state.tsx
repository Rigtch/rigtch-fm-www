import { useContext } from 'react'

import { PlaybackStateContext } from '~/context/playback-state'
import { getAlbumImage } from '~/utils/get-album-image'
import { getArtists } from '~/utils/get-artists'

export const usePlaybackState = () => {
  const playbackStateContext = useContext(PlaybackStateContext)

  const getPlaybackAlbumImage = (index = 0) =>
    getAlbumImage(playbackStateContext.track?.album, index)

  const getPlaybackArtists = () =>
    getArtists(playbackStateContext.track?.artists)

  return {
    ...playbackStateContext,
    getPlaybackArtists,
    getPlaybackAlbumImage,
  }
}
