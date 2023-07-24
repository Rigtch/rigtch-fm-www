import { NextRequest, NextResponse } from 'next/server'
import { Mock, describe, expect, test, vi } from 'vitest'
import { mock } from 'vitest-mock-extended'

import { middleware } from './middleware'

import { getRefresh } from '@api/fetchers'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@api/constants'

vi.mock('@api/fetchers')
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
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
  })

  test('should refresh access token', async () => {
    const request = mock<NextRequest>({
      cookies: {
        get: vi.fn().mockReturnValue({
          value: REFRESH_TOKEN,
        }),
      },
    })

    await middleware(request)

    expect(getRefresh).toHaveBeenCalledWith(REFRESH_TOKEN)
    expect(setCookiesMock).toHaveBeenCalledWith({
      name: ACCESS_TOKEN,
      value: ACCESS_TOKEN,
      path: '/',
    })
  })

  test('should not refresh token because cannot find refresh token cookie', async () => {
    ;(getRefresh as Mock).mockRejectedValueOnce({
      status: 401,
    })

    const request = mock<NextRequest>({
      cookies: {
        get: vi.fn(),
      },
    })

    await middleware(request)

    expect(getRefresh).not.toHaveBeenCalled()
    expect(setCookiesMock).not.toHaveBeenCalled()
  })
})
