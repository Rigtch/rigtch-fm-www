import { NextRequest, NextResponse } from 'next/server'
import { mockDeep } from 'vitest-mock-extended'

import { GET } from './route'

vi.mock('next/server', () => {
  const NextResponse = vi.fn()

  // @ts-expect-error - Mock doesn't support static properties
  NextResponse.redirect = vi.fn()
  NextResponse.prototype.cookies = {
    set: vi.fn(),
  }

  return {
    NextResponse,
  }
})

describe('/api/authorize/route', () => {
  const accessToken = 'accessToken'
  const refreshToken = 'refreshToken'
  const id = 'id'
  const searchParams = new URLSearchParams({
    accessToken,
    refreshToken,
    id,
  })
  const url = `http://localhost/api/authorize?${searchParams.toString()}`
  const requestMock = mockDeep<NextRequest>({
    url,
  })
  const responseMock = mockDeep<NextResponse>()

  describe('GET', () => {
    test('should save cookies and redirect to /profile', () => {
      vi.mocked(NextResponse.redirect).mockReturnValue(responseMock)

      expect(GET(requestMock)).toEqual(responseMock)
      expect(responseMock.cookies.set).toHaveBeenCalledTimes(3)
    })
  })

  test('should not save cookies if any param is missing', () => {
    const searchParams = new URLSearchParams({
      accessToken,
      refreshToken,
    })
    const url = `http://localhost/api/authorize?${searchParams.toString()}`
    const requestMock = mockDeep<NextRequest>({
      url,
    })
    const responseMock = mockDeep<NextResponse>()

    vi.mocked(NextResponse.redirect).mockReturnValue(responseMock)

    expect(GET(requestMock)).toBeUndefined()
    expect(responseMock.cookies.set).not.toHaveBeenCalled()
  })
})
