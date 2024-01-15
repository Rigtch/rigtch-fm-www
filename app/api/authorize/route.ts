import { NextRequest, NextResponse } from 'next/server'

import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'

import { USER_ID } from '@app/constants'

export function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const accessToken = searchParams.get('accessToken')
  const refreshToken = searchParams.get('refreshToken')
  const id = searchParams.get('id')

  if (!accessToken || !refreshToken || !id) return NextResponse.json({})

  const response = NextResponse.redirect(
    new URL(`/profile/${id}`, new URL(request.url))
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
  response.cookies.set({
    name: USER_ID,
    value: id,
    path: '/',
  })

  return response
}
