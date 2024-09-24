import NextAuth from 'next-auth'
import { cookies } from 'next/headers'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { getServerUser, nextAuthConfig } from '@app/auth'
import { USER_ID } from '@app/constants'

const { auth } = NextAuth(nextAuthConfig)

export default auth(async (request: NextRequest) => {
  const user = await getServerUser()
  const userId = cookies().get(USER_ID)?.value
  const disconnectPath = '/api/auth/disconnect'

  if (user && !userId && request.nextUrl.pathname !== disconnectPath)
    return NextResponse.redirect(new URL(disconnectPath, request.url))

  if (['/profile', '/profile/undefined'].includes(request.nextUrl.pathname)) {
    if (!userId) return NextResponse.redirect(new URL('/', request.url))

    return NextResponse.redirect(new URL(`/profile/${userId}`, request.url))
  }
})
