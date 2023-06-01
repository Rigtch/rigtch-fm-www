import { NextRequest, NextResponse } from 'next/server'

import { client } from '~/config'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '~/common/constants'
import { REFRESH_QUERY } from '~/graphql/queries'
import { RefreshQuery } from '~/graphql/types'

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
    context: {
      headers: {
        Authorization: `Basic ${refreshToken}`,
      },
    },
  })

  response.cookies.set({
    name: ACCESS_TOKEN,
    value: accessToken,
    path: '/',
  })

  return response
}
