import { NextResponse } from 'next/server'
import { mockDeep } from 'vitest-mock-extended'

import { GET } from './route'

vi.mock('next/server', () => {
  const NextResponse = vi.fn()

  // @ts-expect-error - Mock doesn't support static properties
  NextResponse.json = vi.fn()
  NextResponse.prototype.cookies = {
    delete: vi.fn(),
  }

  return {
    NextResponse,
  }
})

describe('/api/authorize/route', () => {
  const responseMock = mockDeep<NextResponse>()

  test('should remove cookies', () => {
    vi.spyOn(NextResponse, 'json').mockReturnValue(responseMock)

    GET()

    expect(responseMock.cookies.delete).toHaveBeenCalledTimes(1)
  })
})
