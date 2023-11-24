import { Mock, describe, test, vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'

import { TimeRange } from '../types'
import { ACCESS_TOKEN } from '../constants'
import { getTopGenres } from '../fetchers'

import { useTopGenresQuery } from './use-top-genres'

import { queryClientWrapper } from '@tests/utils'

vi.mock('@app/api/fetchers')
vi.mock('react-cookie', () => ({
  useCookies: () => [{ 'access-token': ACCESS_TOKEN }],
}))

const genresMock = ['rock', 'pop', 'rap']

describe('useTopGenresQuery', () => {
  beforeEach(() => {
    ;(getTopGenres as Mock).mockReturnValue({
      genres: genresMock,
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
  })

  test('should return top genres', async () => {
    const { result } = renderHook(() => useTopGenresQuery(), {
      wrapper: queryClientWrapper,
    })

    await waitFor(() => expect(result.current.isSuccess).toBeTruthy())

    expect(result.current.data?.genres).toEqual(genresMock)
    expect(getTopGenres).toHaveBeenCalledWith(ACCESS_TOKEN, TimeRange.LONG_TERM)
  })
})
