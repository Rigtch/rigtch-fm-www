import { useContext } from 'react'

import { LastTracksContext } from '~/context/last-tracks'

export const useLastTracks = () => useContext(LastTracksContext)
