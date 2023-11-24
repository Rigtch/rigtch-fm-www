import { renderHook, waitFor } from '@testing-library/react'
import { Mock, describe, test, vi } from 'vitest'

import { getLastTracks } from '../fetchers'
import { ACCESS_TOKEN } from '../constants'

import { useLastTracksQuery } from './use-last-tracks-query'

import { queryClientWrapper } from '@tests/utils'
import { trackMock } from '@tests/mocks/track'
import { spotifyResponseMockFactory } from '@tests/mocks/spotify-response'

vi.mock('@app/api/fetchers')
vi.mock('react-cookie', () => ({
  useCookies: () => [{ 'access-token': ACCESS_TOKEN }],
}))

describe('useLastTracksQuery', () => {
  beforeEach(() => {
    ;(getLastTracks as Mock).mockReturnValue(
      spotifyResponseMockFactory([trackMock])
    )
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
  })

  test('should return last tracks', async () => {
    const { result } = renderHook(() => useLastTracksQuery(), {
      wrapper: queryClientWrapper,
    })

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    expect(result.current.data?.items?.[0]?.name).toEqual('Track 1')
    expect(getLastTracks).toHaveBeenCalledWith(ACCESS_TOKEN)
  })
})
