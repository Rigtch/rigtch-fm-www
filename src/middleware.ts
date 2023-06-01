import { NextRequest, NextResponse } from 'next/server'

import { client } from '~/config'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '~/common/constants'
import { REFRESH_QUERY } from '~/graphql/queries'
import { RefreshQuery } from '~/graphql/types'
import { AuthorizationType, applyAuthorizationHeader } from '~/common/auth'

export async function middleware(request: NextRequest) {
  const refreshToken = request.cookies.get(REFRESH_TOKEN)?.value
  const response = NextResponse.next()

  if (!refreshToken) return response

  const {
    data: {
      refresh: { accessToken },
    },
  } = await client.query<RefreshQuery>({
    query: REFRESH_QUERY,
    ...applyAuthorizationHeader(refreshToken, AuthorizationType.Basic),
  })

  response.cookies.set({
    name: ACCESS_TOKEN,
    value: accessToken,
    path: '/',
  })

  return response
}
