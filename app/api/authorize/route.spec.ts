import { NextRequest, NextResponse } from 'next/server'
import { DeepMockProxy, mockDeep } from 'vitest-mock-extended'

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

describe('(App) api/authorize/route', () => {
  const accessToken = 'accessToken'
  const refreshToken = 'refreshToken'
  const searchParams = new URLSearchParams({
    accessToken,
    refreshToken,
  })
  const url = `http://localhost/api/authorize?${searchParams.toString()}`

  let requestMock: DeepMockProxy<NextRequest>
  let responseMock: DeepMockProxy<NextResponse>

  beforeEach(() => {
    requestMock = mockDeep<NextRequest>({
      url,
    })
    responseMock = mockDeep<NextResponse>()
  })

  describe('GET', () => {
    it('should save cookies and redirect to /profile', async () => {
      vi.mocked(NextResponse.redirect).mockReturnValue(responseMock)

      expect(await GET(requestMock)).toEqual(responseMock)
      expect(responseMock.cookies.set).toHaveBeenCalledTimes(2)
    })
  })
})
