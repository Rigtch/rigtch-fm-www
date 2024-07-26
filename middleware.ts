import NextAuth from 'next-auth'
import { type NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import { nextAuthConfig } from '@app/auth'
import { USER_ID } from '@app/constants'

const { auth } = NextAuth(nextAuthConfig)

export default auth((request: NextRequest) => {
  const headers = new Headers(request.headers)

  headers.set('x-pathname', request.nextUrl.pathname)

  if (['/profile', '/profile/undefined'].includes(request.nextUrl.pathname)) {
    const userId = cookies().get(USER_ID)?.value

    if (!userId)
      return NextResponse.redirect(new URL('/', request.url), {
        headers,
      })

    return NextResponse.redirect(new URL(`/profile/${userId}`, request.url), {
      headers,
    })
  }

  return NextResponse.next({
    request: {
      headers,
    },
  })
})
