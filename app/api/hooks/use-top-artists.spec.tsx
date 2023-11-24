import { renderHook, waitFor } from '@testing-library/react'
import { Mock, describe, test, vi } from 'vitest'

import { TimeRange } from '../types'
import { ACCESS_TOKEN } from '../constants'
import { getTopArtists } from '../fetchers'

import { useTopArtistsQuery } from './use-top-artists'

import { queryClientWrapper } from '@tests/utils'
import { artistMock, spotifyResponseMockFactory } from '@tests/mocks'

vi.mock('@app/api/fetchers')
vi.mock('react-cookie', () => ({
  useCookies: () => [{ 'access-token': ACCESS_TOKEN }],
}))

describe('useTopArtistsQuery', () => {
  beforeEach(() => {
    ;(getTopArtists as Mock).mockReturnValue(
      spotifyResponseMockFactory([artistMock])
    )
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
  })

  test('should return top artists', async () => {
    const { result } = renderHook(() => useTopArtistsQuery(), {
      wrapper: queryClientWrapper,
    })

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    expect(result.current.data?.items[0]?.name).toEqual('Artist 1')
    expect(getTopArtists).toHaveBeenCalledWith(
      ACCESS_TOKEN,
      TimeRange.LONG_TERM,
      10
    )
  })
})
