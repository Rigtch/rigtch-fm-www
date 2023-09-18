import { Mock, describe, test, vi } from 'vitest'
import { mock } from 'vitest-mock-extended'

import { getPlaybackState } from './get-playback-state'
import { fetchApi } from './fetch-api'

import { PlaybackState } from '@api/types'
import { trackMock } from '@tests/mocks'

vi.mock('./fetch-api')

describe('getPlaybackState', () => {
  beforeEach(() => {
    ;(fetchApi as Mock).mockResolvedValue(
      mock<PlaybackState>({
        track: trackMock,
      })
    )
  })

  test('should get playback state', async () => {
    const {
      track: { name },
    } = await getPlaybackState()

    expect(name).toEqual('Track 1')
  })
})
