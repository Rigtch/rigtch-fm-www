import { renderHook, waitFor } from '@testing-library/react'
import { Mock, describe, test, vi } from 'vitest'
import { mock } from 'vitest-mock-extended'
import { useState } from 'react'

import { ACCESS_TOKEN } from '../constants'
import { getPlaybackState } from '../fetchers'
import { PlaybackState } from '../types'

import { usePlaybackStateQuery } from './use-playback-state-query'

import { queryClientWrapper } from '@tests/utils'

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
    ;(getPlaybackState as Mock).mockReturnValue(
      mock<PlaybackState>({
        track: {
          name: 'track 1',
          album: {
            images: [
              {
                url: 'url',
              },
            ],
          },
        },
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

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    expect(result.current.data?.track?.name).toEqual('track 1')
    expect(getPlaybackState).toHaveBeenCalledWith(ACCESS_TOKEN)
  })

  test('should change refetchInterval', async () => {
    const setState = vi.fn()

    ;(getPlaybackState as Mock).mockImplementation(() => {
      throw new Error('error')
    })
    ;(useState as Mock).mockReturnValue([1000, setState])

    const { result } = renderHook(() => usePlaybackStateQuery(), {
      wrapper: queryClientWrapper,
    })

    await waitFor(() => expect(result.current.error).toBeTruthy())

    expect(setState).toHaveBeenCalledWith(10_000)
  })
})
