import { mock } from 'vitest-mock-extended'

import { PlaybackState } from '../types'

import { getPlaybackState } from './get-playback-state'
import { fetchApi } from './fetch-api'

import { trackMock } from '@tests/mocks/track'

vi.mock('./fetch-api')

describe('getPlaybackState', () => {
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
    } = await getPlaybackState()!

    expect(name).toBe('Track 1')
  })
})
