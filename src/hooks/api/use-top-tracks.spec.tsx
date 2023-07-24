import { renderHook, waitFor } from '@testing-library/react'
import { Mock, describe, test, vi } from 'vitest'

import { useTopTracksQuery } from './use-top-tracks'

import { ACCESS_TOKEN } from '@api/constants'
import { getTopTracks } from '@api/fetchers'
import { queryClientWrapper } from '@tests/utils'
import { trackMock } from '@tests/mocks'

vi.mock('@api/fetchers')
vi.mock('react-cookie', () => ({
  useCookies: () => [{ 'access-token': ACCESS_TOKEN }],
}))

describe('useTopTracksQuery', () => {
  beforeEach(() => {
    ;(getTopTracks as Mock).mockReturnValue([trackMock])
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

    expect(result.current.data?.[0].name).toEqual('Track 1')
    expect(getTopTracks).toHaveBeenCalledWith(ACCESS_TOKEN)
  })
})
