import { renderHook, waitFor } from '@testing-library/react'
import { Mock, describe, test, vi } from 'vitest'

import { TimeRange } from '../types'
import { ACCESS_TOKEN } from '../constants'
import { getTopTracks } from '../fetchers'

import { useTopTracksQuery } from './use-top-tracks'

import { queryClientWrapper } from '@tests/utils'
import { spotifyResponseMockFactory, trackMock } from '@tests/mocks'

vi.mock('@app/api/fetchers')
vi.mock('react-cookie', () => ({
  useCookies: () => [{ 'access-token': ACCESS_TOKEN }],
}))

describe('useTopTracksQuery', () => {
  beforeEach(() => {
    ;(getTopTracks as Mock).mockReturnValue(
      spotifyResponseMockFactory([trackMock])
    )
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
  })

  test('should return top tracks', async () => {
    const { result } = renderHook(() => useTopTracksQuery(), {
      wrapper: queryClientWrapper,
    })

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    expect(result.current.data?.items[0].name).toEqual('Track 1')
    expect(getTopTracks).toHaveBeenCalledWith(
      ACCESS_TOKEN,
      TimeRange.LONG_TERM,
      10
    )
  })
})
