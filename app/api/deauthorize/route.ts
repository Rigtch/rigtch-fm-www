import { NextResponse } from 'next/server'

import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'

import { USER_ID } from '@app/constants'

export function GET() {
  const response = NextResponse.json({})

  response.cookies.delete(ACCESS_TOKEN)
  response.cookies.delete(REFRESH_TOKEN)
  response.cookies.delete(USER_ID)

  return response
}
