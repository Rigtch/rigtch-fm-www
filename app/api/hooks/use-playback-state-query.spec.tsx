import { renderHook, waitFor } from '@testing-library/react'
import { mock } from 'vitest-mock-extended'
import { useState } from 'react'

import { ACCESS_TOKEN } from '../constants'
import { getPlaybackState } from '../fetchers'
import { PlaybackState } from '../types'

import { usePlaybackStateQuery } from './use-playback-state-query'

import { queryClientWrapper } from '@tests/utils'
import { trackMock, trackNameMock } from '@tests/mocks/track'

vi.mock('@app/api/fetchers')
vi.mock('react', async () => {
  const actual = await vi.importActual<typeof import('react')>('react')

  return {
    ...actual,
    useState: vi.fn().mockReturnValue([1000, vi.fn()]),
  }
})
vi.mock('react-cookie', () => ({
  useCookies: () => [{ 'access-token': ACCESS_TOKEN }],
}))

describe('usePlaybackStateQuery', () => {
  beforeEach(() => {
    vi.mocked(getPlaybackState).mockResolvedValue(
      mock<PlaybackState>({
        track: trackMock,
      })
    )
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
  })

  test('should return playback state', async () => {
    const { result } = renderHook(() => usePlaybackStateQuery(), {
      wrapper: queryClientWrapper,
    })

    await waitFor(() => {
      expect(result.current.isSuccess).toBeTruthy()
    })

    expect(result.current.data?.track.name).toEqual(trackNameMock)
    expect(getPlaybackState).toHaveBeenCalledWith(ACCESS_TOKEN)
  })

  test('should change refetchInterval', async () => {
    const setState = vi.fn()

    vi.mocked(getPlaybackState).mockImplementation(() => {
      throw new Error('error')
    })
    vi.mocked(useState).mockReturnValue([1000, setState])

    const { result } = renderHook(() => usePlaybackStateQuery(), {
      wrapper: queryClientWrapper,
    })

    await waitFor(() => {
      expect(result.current.error).toBeTruthy()
    })

    expect(setState).toHaveBeenCalledWith(10_000)
  })
})
