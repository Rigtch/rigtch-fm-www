import { renderHook, waitFor } from '@testing-library/react'
import { Mock, describe, test, vi } from 'vitest'

import { useLastTracksQuery } from './use-last-tracks'

import { getLastTracks } from '@api/fetchers'
import { ACCESS_TOKEN } from '@api/constants'
import { queryClientWrapper } from '@tests/utils'
import { trackMock } from '@tests/mocks'

vi.mock('@api/fetchers')
vi.mock('react-cookie', () => ({
  useCookies: () => [{ 'access-token': ACCESS_TOKEN }],
}))

describe('useLastTracksQuery', () => {
  beforeEach(() => {
    ;(getLastTracks as Mock).mockReturnValue([trackMock])
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

    expect(result.current.data?.[0]?.name).toEqual('Track 1')
    expect(getLastTracks).toHaveBeenCalledWith(ACCESS_TOKEN)
  })
})
