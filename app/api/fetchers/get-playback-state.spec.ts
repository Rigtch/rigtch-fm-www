import { Mock, describe, test, vi } from 'vitest'
import { mock } from 'vitest-mock-extended'

import { PlaybackState } from '../types'

import { getPlaybackState } from './get-playback-state'
import { fetchApi } from './fetch-api'

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
    } = (await getPlaybackState()) as PlaybackState

    expect(name).toEqual('Track 1')
  })
})
