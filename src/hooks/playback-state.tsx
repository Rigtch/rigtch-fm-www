import { useContext } from 'react'

import { PlaybackStateContext } from '~/context/playback-state'

export const usePlaybackState = () => {
  const playbackStateContext = useContext(PlaybackStateContext)

  const getPlaybackAlbumImage = (index = 0) =>
    playbackStateContext.track?.album.images[index]?.url ?? ''

  const getPlaybackArtists = () =>
    playbackStateContext.track?.artists.map(({ name }) => name).join(', ') ?? ''

  return {
    ...playbackStateContext,
    getPlaybackArtists,
    getPlaybackAlbumImage,
  }
}
