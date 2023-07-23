import { NextRequest, NextResponse } from 'next/server'

import { ACCESS_TOKEN, REFRESH_TOKEN } from '@api/constants'
import { getRefresh } from '@api/fetchers'

export async function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get(REFRESH_TOKEN)?.value
  const response = NextResponse.next()

  if (!refreshToken) return response

  const { accessToken } = await getRefresh(refreshToken)

  response.cookies.set({
    name: ACCESS_TOKEN,
    value: accessToken,
    path: '/',
  })

  return response
}
