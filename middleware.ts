import { NextRequest, NextResponse } from 'next/server'

import {
  ACCESS_TOKEN,
  EXPIRATION_DATE,
  REFRESH_TOKEN,
} from '@app/api/constants'
import { getRefresh } from '@app/api/fetchers'
import { USER_ID } from '@app/constants'

export async function middleware(request: NextRequest) {
  const userId = request.cookies.get(USER_ID)?.value

  const expirationDateCookie = request.cookies.get(EXPIRATION_DATE)

  const refreshToken = request.cookies.get(REFRESH_TOKEN)?.value
  const shouldRefresh =
    new Date(expirationDateCookie?.value ?? Date.now()).valueOf() - Date.now() <
    1800 * 1000

  const response = ['/profile', '/profile/undefined'].includes(
    request.nextUrl.pathname
  )
    ? NextResponse.redirect(new URL(`/profile/${userId}`, new URL(request.url)))
    : NextResponse.next()

  if (!refreshToken || !shouldRefresh || !userId) return response

  console.log('refreshing token')

  const { accessToken, expiresIn } = await getRefresh(refreshToken)

  const expirationDate = new Date(
    Date.now() + (expiresIn ?? 0) * 1000
  ).toLocaleString()

  response.cookies.set({
    name: ACCESS_TOKEN,
    value: accessToken,
    maxAge: expiresIn,
    path: '/',
  })
  response.cookies.set({
    name: EXPIRATION_DATE,
    value: expirationDate,
    maxAge: expiresIn,
    path: '/',
  })

  return response
}
