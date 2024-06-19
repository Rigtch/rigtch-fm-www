import type { MockInstance } from 'vitest'
import { type NextRequest, NextResponse } from 'next/server'
import { mock } from 'vitest-mock-extended'
import type { AppRouteHandlerFnContext } from 'next-auth/lib/types'
import { cookies } from 'next/headers'
import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'

import middleware from './middleware'

vi.mock('next-auth', () => ({
  default: vi.fn().mockReturnValue({
    auth: vi.fn().mockImplementation((function_: never) => function_),
  }),
}))

vi.mock('next/server')
vi.mock('next/headers')

const cookiesFactoryMock = (value?: string) =>
  ({
    get: vi.fn().mockReturnValue({
      value,
    }),
  }) as unknown as ReadonlyRequestCookies

const requestFactoryMock = (pathname: string) =>
  mock<NextRequest>({
    nextUrl: {
      pathname,
    },
    url: 'http://localhost:3000',
  } as unknown as NextRequest)

describe('middleware', () => {
  const userId = 'userId'

  let redirectSpy: MockInstance
  let cookiesSpy: MockInstance

  beforeEach(() => {
    redirectSpy = vi.mocked(NextResponse.redirect)
    cookiesSpy = vi.mocked(cookies)
  })

  test('should redirect to profile page if user is logged in', async () => {
    const requestMock = requestFactoryMock('/profile')

    cookiesSpy.mockImplementation(() => cookiesFactoryMock(userId))

    await middleware(requestMock, mock<AppRouteHandlerFnContext>())

    expect(redirectSpy).toHaveBeenCalledWith(
      new URL(`/profile/${userId}`, requestMock.url)
    )
    expect(cookiesSpy).toHaveBeenCalled()
  })

  test('should redirect to home page if user is not logged in', async () => {
    const request = requestFactoryMock('/profile')

    cookiesSpy.mockImplementation(cookiesFactoryMock)

    await middleware(request, mock<AppRouteHandlerFnContext>())

    expect(redirectSpy).toHaveBeenCalledWith(new URL('/', request.url))
    expect(cookiesSpy).toHaveBeenCalled()
  })
})
