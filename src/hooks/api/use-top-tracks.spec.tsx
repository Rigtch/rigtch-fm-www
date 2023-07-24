import { renderHook, waitFor } from '@testing-library/react'
import { Mock, describe, test, vi } from 'vitest'
import { mock } from 'vitest-mock-extended'

import { useTopTracksQuery } from './use-top-tracks'

import { ACCESS_TOKEN } from '@api/constants'
import { getTopTracks } from '@api/fetchers'
import { Track } from '@api/types'
import { queryClientWrapper } from '@tests/utils'

vi.mock('@api/fetchers')
vi.mock('react-cookie', () => ({
  useCookies: () => [{ 'access-token': ACCESS_TOKEN }],
}))

describe('useTopTracksQuery', () => {
  beforeEach(() => {
    ;(getTopTracks as Mock).mockReturnValue([mock<Track>({ name: 'track 1' })])
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

    expect(result.current.data?.[0].name).toEqual('track 1')
    expect(getTopTracks).toHaveBeenCalledWith(ACCESS_TOKEN)
  })
})
