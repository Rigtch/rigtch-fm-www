import { Analysis } from '@api/types'
import { environment } from '@config/environment'

export async function getAnalysis(token?: string): Promise<Analysis> {
  const response = await fetch(`${environment.API_URL}/statistics/analysis`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (response.status === 401) throw new Error(response.statusText)

  return await response.json()
}
