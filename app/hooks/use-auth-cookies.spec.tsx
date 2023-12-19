import { useCookies } from 'react-cookie'
import { renderHook, waitFor } from '@testing-library/react'

import { useAuthCookies } from './use-auth-cookies'

import { ACCESS_TOKEN, REFRESH_TOKEN } from '@app/api/constants'

vi.mock('react-cookie')

describe('useAuthCookies', () => {
  const removeCookiesSpy = vi.fn()

  beforeEach(() => {
    vi.mocked(useCookies).mockReturnValue([
      { 'access-token': ACCESS_TOKEN, 'refresh-token': REFRESH_TOKEN },
      vi.fn(),
      removeCookiesSpy,
      vi.fn(),
    ])
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
  })

  test('should return auth cookies', async () => {
    const { result } = renderHook(() => useAuthCookies())

    await waitFor(() => {
      expect(result.current.accessToken).toEqual(ACCESS_TOKEN)
    })
    await waitFor(() => {
      expect(result.current.refreshToken).toEqual(REFRESH_TOKEN)
    })
  })

  test('should remove auth cookies', () => {
    const { result } = renderHook(() => useAuthCookies())

    result.current.removeAuthCookies()

    expect(removeCookiesSpy).toHaveBeenCalledWith(ACCESS_TOKEN)
    expect(removeCookiesSpy).toHaveBeenCalledWith(REFRESH_TOKEN)
  })
})
