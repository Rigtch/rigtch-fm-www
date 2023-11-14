import { renderHook, waitFor } from '@testing-library/react'
import { Mock, describe, test, vi } from 'vitest'

import { useTopArtistsQuery } from './use-top-artists'

import { TimeRange } from '@api/types'
import { ACCESS_TOKEN } from '@api/constants'
import { getTopArtists } from '@api/fetchers'
import { queryClientWrapper } from '@tests/utils'
import { artistMock, spotifyResponseMockFactory } from '@tests/mocks'

vi.mock('@api/fetchers')
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