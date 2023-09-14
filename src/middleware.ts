import { NextRequest, NextResponse } from 'next/server'

import { ACCESS_TOKEN, REFRESH_TOKEN } from '@api/constants'
import { getProfile, getRefresh } from '@api/fetchers'

export async function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get(REFRESH_TOKEN)?.value
  const accessToken = request.cookies.get(ACCESS_TOKEN)?.value

  const destinationUrl = new URL('/profile', new URL(request.url))
  const response =
    request.nextUrl.pathname === '/'
      ? NextResponse.redirect(destinationUrl.toString(), {
          status: 302,
        })
      : NextResponse.next()

  const isLoggedIn = await getProfile(accessToken)
    .catch(() => false)
    .then(() => true)

  if (!refreshToken || isLoggedIn) return NextResponse.next()

  const { accessToken: refreshedAccesToken } = await getRefresh(refreshToken)

  response.cookies.set({
    name: ACCESS_TOKEN,
    value: refreshedAccesToken,
    path: '/',
  })

  return response
}
