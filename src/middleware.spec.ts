import { NextRequest, NextResponse } from 'next/server'
import { Mock, describe, expect, test, vi } from 'vitest'
import { mock } from 'vitest-mock-extended'

import { middleware } from './middleware'

import { getProfile, getRefresh } from '@api/fetchers'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@api/constants'

vi.mock('@api/fetchers', () => ({
  getProfile: vi.fn().mockRejectedValue(false),
  getRefresh: vi.fn(),
}))
vi.mock('next/server', async () => {
  // const actual = await vi.importActual<typeof import('next/server')>(
  //   'next/server'
  // )

  return {
    Request: vi.fn(),
    NextResponse: {
      next: vi.fn().mockReturnValue({
        cookies: {
          set: vi.fn(),
        },
      }),
      redirect: vi.fn(),
    },
  }
})

describe('middleware', () => {
  const setCookiesMock = vi.fn()

  beforeEach(() => {
    ;(getRefresh as Mock).mockReturnValue({
      accessToken: ACCESS_TOKEN,
    })
    ;(NextResponse.next as Mock).mockReturnValue({
      cookies: {
        set: setCookiesMock,
      },
      nextUrl: {
        pathname: '/',
      },
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
  })

  test('should not redirect or refresh token', async () => {
    const request = mock<NextRequest>({
      cookies: {
        get: vi.fn(),
      },
      url: 'http://localhost:3000',
      nextUrl: {
        pathname: '/',
      },
    })

    await middleware(request)

    expect(getProfile).toHaveBeenCalledWith(undefined)
  })

  // @TODO find way to mock `getProfile` response
  test.skip('should refresh token and redirect to /profile', async () => {
    const request = mock<NextRequest>({
      cookies: {
        get: vi.fn().mockReturnValue({
          value: REFRESH_TOKEN,
        }),
      },
      url: 'http://localhost:3000',
      nextUrl: {
        pathname: '/',
      },
    })

    ;(getProfile as Mock).mockRejectedValue(false)

    await middleware(request)

    expect(getRefresh).toHaveBeenCalledWith(REFRESH_TOKEN)
  })
})
