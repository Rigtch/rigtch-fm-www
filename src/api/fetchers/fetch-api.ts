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

  if ([401, 403].includes(response.status)) {
    // if (
    //   parsedResponse.message === 'The access token expired' &&
    //   refreshTokenFunction
    // ) {
    //   await refreshTokenFunction?.().then(() =>
    //     fetchApi(path, { method, token })
    //   )
    // }

    throw new Error(parsedResponse.message)
  }

  return parsedResponse
}
