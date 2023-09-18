import { HttpMethod } from '@api/types'
import { environment } from '@config/environment'

export interface FetchApiOptions {
  method?: HttpMethod
  token?: string
}

export async function fetchApi<T>(
  path: string,
  { method = HttpMethod.GET, token }: FetchApiOptions = {}
): Promise<T> {
  const response = await fetch(environment.API_URL + path, {
    method,
    ...(token && {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  })

  const parsedResponse = await response.json()

  if ([401, 403].includes(response.status))
    throw new Error(parsedResponse.message)

  return parsedResponse
}
