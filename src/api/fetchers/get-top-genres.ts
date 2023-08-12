import { TimeRange } from '@api/types'
import { environment } from '@config/environment'

export async function getTopGenres(
  token?: string,
  timeRange = TimeRange.LONG_TERM
): Promise<{ genres: string[] }> {
  const response = await fetch(
    `${environment.API_URL}/statistics/top-genres?timeRange=${timeRange}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  const parsedResponse = await response.json()

  if ([401, 403].includes(response.status))
    throw new Error(parsedResponse.message)

  return parsedResponse
}
