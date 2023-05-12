import { NextApiRequest, NextApiResponse } from 'next'
import { serialize } from 'cookie'

export default async function handle(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { accessToken, refreshToken } = request.query

  if (!accessToken || !refreshToken) return

  const accessTokenCookie = serialize('access-token', accessToken as string, {
    path: '/',
  })
  const refreshTokenCookie = serialize(
    'refresh-token',
    refreshToken as string,
    {
      path: '/',
    }
  )

  response
    .setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie])
    .redirect('/')
}
