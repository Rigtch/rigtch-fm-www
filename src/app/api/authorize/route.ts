import { NextRequest, NextResponse } from 'next/server'

import { ACCESS_TOKEN, REFRESH_TOKEN } from '@api/constants'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const accessToken = searchParams.get('accessToken')
  const refreshToken = searchParams.get('refreshToken')

  if (!accessToken || !refreshToken) return

  const response = NextResponse.redirect(
    new URL('/profile', new URL(request.url))
  )

  response.cookies.set({
    name: ACCESS_TOKEN,
    value: accessToken,
    path: '/',
  })
  response.cookies.set({
    name: REFRESH_TOKEN,
    value: refreshToken,
    path: '/',
  })

  return response
}
