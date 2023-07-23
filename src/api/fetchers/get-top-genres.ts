import { environment } from '@config/environment'

export async function getTopGenres(
  token?: string
): Promise<{ genres: string[] }> {
  const response = await fetch(`${environment.API_URL}/statistics/top-genres`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (response.status === 401) throw new Error(response.statusText)

  return await response.json()
}
