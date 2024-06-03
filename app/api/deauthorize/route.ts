import { NextResponse } from 'next/server'

import { USER_ID } from '@app/constants'

export function GET() {
  const response = NextResponse.json({})

  response.cookies.delete(USER_ID)

  return response
}
