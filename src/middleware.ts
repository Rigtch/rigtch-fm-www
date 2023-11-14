import { NextRequest, NextResponse } from 'next/server'

import { ACCESS_TOKEN, REFRESH_TOKEN } from '@api/constants'
import { getRefresh } from '@api/fetchers'

export async function middleware(request: NextRequest) {
  const response =
    request.nextUrl.pathname === '/'
      ? NextResponse.redirect(new URL('/profile', new URL(request.url)))
      : NextResponse.next()

  const refreshToken = request.cookies.get(REFRESH_TOKEN)?.value

  if (!refreshToken) return NextResponse.next()

  const { accessToken, expiresIn } = await getRefresh(refreshToken)

  console.log('refreshing token')

  response.cookies.set({
    name: ACCESS_TOKEN,
    value: accessToken,
    maxAge: expiresIn,
    path: '/',
  })

  return response
}
