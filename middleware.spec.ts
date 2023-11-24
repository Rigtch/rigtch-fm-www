import { NextRequest, NextResponse } from 'next/server'
import { DeepMockProxy, mockDeep } from 'vitest-mock-extended'

import { middleware } from './middleware'

import { EXPIRATION_DATE, REFRESH_TOKEN } from '@app/api/constants'
import { getRefresh } from '@app/api/fetchers'

vi.mock('@app/api/fetchers')
vi.mock('next/server', () => {
  const NextResponse = vi.fn()

  // @ts-expect-error - Mock doesn't support static properties
  NextResponse.redirect = vi.fn().mockReturnThis()
  // @ts-expect-error - Mock doesn't support static properties
  NextResponse.next = vi.fn().mockReturnThis()
  // @ts-expect-error - Mock doesn't support static properties
  NextResponse.cookies = {
    set: vi.fn(),
  }

  return {
    NextResponse,
  }
})

describe('middleware', () => {
  const accessTokenMock = 'accessToken'

  let requestMock: DeepMockProxy<NextRequest>

  beforeEach(() => {
    requestMock = mockDeep<NextRequest>({
      url: 'http://localhost:3000/',
      cookies: {
        get: vi.fn(),
        set: vi.fn(),
      },
    })

    // @ts-expect-error mockDeep doesn't support this
    vi.spyOn(requestMock.cookies, 'get').mockImplementation((...args) => {
      if (args[0] === EXPIRATION_DATE) {
        return {
          name: EXPIRATION_DATE,
          value: new Date(Date.now() - 1800 * 1000).toISOString(),
        }
      }
      return {
        name: REFRESH_TOKEN,
        value: 'refreshToken',
      }
    })
  })

  test('should refresh token', async () => {
    requestMock.nextUrl.pathname = '/profile'

    vi.mocked(getRefresh).mockResolvedValue({
      accessToken: accessTokenMock,
      expiresIn: 3600,
    })

    await middleware(requestMock)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((NextResponse as any).cookies.set).toHaveBeenCalledTimes(2)
  })

  test('should redirect to /profile', async () => {
    requestMock.nextUrl.pathname = '/'

    await middleware(requestMock)

    expect(NextResponse.redirect).toHaveBeenCalled()
  })
})
