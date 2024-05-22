import { NextRequest, NextResponse } from 'next/server'
import { mockDeep } from 'vitest-mock-extended'

import { middleware } from './middleware'

import { EXPIRATION_DATE, REFRESH_TOKEN } from '@app/api/constants'
import { getRefresh } from '@app/api/fetchers'

vi.mock('@app/api/fetchers')
vi.mock('next/server', () => {
  const NextResponse = vi.fn()

  // @ts-expect-error - Mock doesn't support static properties
  NextResponse.redirect = vi.fn()
  // @ts-expect-error - Mock doesn't support static properties
  NextResponse.next = vi.fn()

  return {
    NextResponse,
  }
})

describe('middleware', () => {
  const accessTokenMock = 'accessToken'

  const requestMock = mockDeep<NextRequest>({
    url: 'http://localhost:3000/',
    cookies: {
      get: vi.fn(),
      set: vi.fn(),
    },
  })
  const responseMock = mockDeep<NextResponse>({
    cookies: {
      set: vi.fn(),
    },
  })

  beforeEach(() => {
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

  test('should return if no cookies', async () => {
    const nextSpy = vi.spyOn(NextResponse, 'next').mockReturnValue(responseMock)
    const cookiesGetSpy = vi
      .spyOn(requestMock.cookies, 'get')
      .mockResolvedValue(undefined)

    expect(await middleware(requestMock)).toEqual(responseMock)

    expect(cookiesGetSpy).toHaveBeenCalledTimes(3)
    expect(nextSpy).toHaveBeenCalled()
  })

  test('should refresh token', async () => {
    vi.mocked(getRefresh).mockResolvedValue({
      accessToken: accessTokenMock,
      expiresIn: 3600,
    })
    const nextSpy = vi.spyOn(NextResponse, 'next').mockReturnValue(responseMock)

    await middleware(requestMock)

    expect(nextSpy).toHaveBeenCalled()
    expect(responseMock.cookies.set).toHaveBeenCalledTimes(2)
  })
})
