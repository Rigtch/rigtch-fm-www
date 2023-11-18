import { HttpMethod } from '@api/types'
import { environment } from '@config/environment'

export interface FetchApiOptions {
  method?: HttpMethod
  token?: string
  cache?: RequestCache
}

export async function fetchApi<T>(
  path: string,
  {
    method = HttpMethod.GET,
    token,
    cache = 'force-cache',
  }: FetchApiOptions = {}
): Promise<T> {
  const response = await fetch(environment.API_URL + path, {
    method,
    ...(token && {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    cache,
  })

  const parsedResponse = await response.json()

  if (!response.ok) {
    // if (parsedResponse.error === 'No device is currently playing') {
    //   return
    // }
    throw new Error(parsedResponse.message)
  }

  return parsedResponse
}
