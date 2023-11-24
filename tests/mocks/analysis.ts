import { mock } from 'vitest-mock-extended'

import { Analysis } from '@app/api/types'

export const analysisMock = mock<Analysis>({
  danceability: 0.210_84,
  acousticness: 0.090_718_856_399_999_99,
  instrumentalness: 0.509_508_499_999_999_9,
  speechiness: 0.080_886_000_000_000_01,
  liveness: 0.225_961_999_999_999_89,
  loudness: -9.001_660_000_000_001,
  energy: 0.802_340_000_000_000_3,
  tempo: 135.155_020_000_000_06,
  mode: 0.6,
  key: 5.4,
  valence: 0.154_382_000_000_000_02,
})
