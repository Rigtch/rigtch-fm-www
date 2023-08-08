import { environment } from '@config/environment'

export async function getTopGenres(
  token?: string
): Promise<{ genres: string[] }> {
  const response = await fetch(`${environment.API_URL}/statistics/top-genres`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const parsedResponse = await response.json()

  if ([401, 403].includes(response.status))
    throw new Error(parsedResponse.message)

  return parsedResponse
}
