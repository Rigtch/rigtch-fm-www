import { Mock, vi } from 'vitest'
import { useCookies } from 'react-cookie'
import { renderHook, waitFor } from '@testing-library/react'

import { useAuthCookies } from './use-auth-cookies'

import { ACCESS_TOKEN, REFRESH_TOKEN } from '@api/constants'

vi.mock('react-cookie')

describe('useAuthCookies', () => {
  const removeCookiesSpy = vi.fn()

  beforeEach(() => {
    ;(useCookies as Mock).mockReturnValue([
      { 'access-token': ACCESS_TOKEN, 'refresh-token': REFRESH_TOKEN },
      vi.fn(),
      removeCookiesSpy,
    ])
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
  })

  test('should return auth cookies', async () => {
    const { result } = renderHook(() => useAuthCookies())

    await waitFor(() =>
      expect(result.current.accessToken).toEqual(ACCESS_TOKEN)
    )
    await waitFor(() =>
      expect(result.current.refreshToken).toEqual(REFRESH_TOKEN)
    )
  })

  test('should remove auth cookies', async () => {
    const { result } = renderHook(() => useAuthCookies())

    result.current.removeAuthCookies()

    expect(removeCookiesSpy).toHaveBeenCalledWith('access-token')
    expect(removeCookiesSpy).toHaveBeenCalledWith('refresh-token')
  })
})
