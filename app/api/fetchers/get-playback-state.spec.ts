import { mock } from 'vitest-mock-extended'

import { PlaybackState } from '../types'

import { getPlaybackState } from './get-playback-state'
import { fetchApi } from './fetch-api'

import { trackMock, trackNameMock } from '@tests/mocks/track'

vi.mock('./fetch-api')

describe('getPlaybackState', () => {
  const accessToken = 'accessToken'
  const userId = 'userId'

  beforeEach(() => {
    vi.mocked(fetchApi).mockResolvedValue(
      mock<PlaybackState>({
        track: trackMock,
      })
    )
  })

  test('should get playback state', async () => {
    const {
      track: { name },
    } = await getPlaybackState(accessToken, { userId })

    expect(name).toBe(trackNameMock)
  })
})
