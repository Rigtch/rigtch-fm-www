import { NextApiRequest, NextApiResponse } from 'next'
import { serialize } from 'cookie'

import { ACCESS_TOKEN, REFRESH_TOKEN } from '~/common/constants'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { accessToken, refreshToken } = request.query

  if (!accessToken || !refreshToken) return

  const accessTokenCookie = serialize(ACCESS_TOKEN, accessToken as string, {
    path: '/',
  })
  const refreshTokenCookie = serialize(REFRESH_TOKEN, refreshToken as string, {
    path: '/',
  })

  return response
    .setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie])
    .redirect('/')
}
