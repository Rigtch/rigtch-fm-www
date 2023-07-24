import { renderHook, waitFor } from '@testing-library/react'
import { Mock, describe, vi } from 'vitest'
import { mock } from 'vitest-mock-extended'

import { useTopArtistsQuery } from './use-top-artists'

import { ACCESS_TOKEN } from '@api/constants'
import { getTopArtists } from '@api/fetchers'
import { Artist } from '@api/types'
import { queryClientWrapper } from '@tests/utils'

vi.mock('@api/fetchers')
vi.mock('react-cookie', () => ({
  useCookies: () => [{ 'access-token': ACCESS_TOKEN }],
}))

describe('useTopArtistsQuery', () => {
  beforeEach(() => {
    ;(getTopArtists as Mock).mockReturnValue([
      mock<Artist>({ name: 'artist 1' }),
    ])
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
  })

  it('should return top artists', async () => {
    const { result } = renderHook(() => useTopArtistsQuery(), {
      wrapper: queryClientWrapper,
    })

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    expect(result.current.data?.[0]?.name).toEqual('artist 1')
    expect(getTopArtists).toHaveBeenCalledWith(ACCESS_TOKEN)
  })
})
