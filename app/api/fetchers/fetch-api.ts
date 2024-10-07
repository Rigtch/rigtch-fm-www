import type { HttpMethod } from '../types'

import { env } from '@app/config/env'

export interface FetchApiOptions<TBody = unknown> {
  method?: HttpMethod
  token?: string
  body?: TBody
  cache?: RequestCache
  next?: RequestInit['next']
}

export async function fetchApi<TData, TBody = unknown>(
  path: string,
  {
    method = 'GET',
    token,
    body,
    cache = 'force-cache',
    next,
  }: FetchApiOptions<TBody> = {}
): Promise<TData> {
  const response = await fetch(env.NEXT_PUBLIC_API_URL + path, {
    method,
    headers: {
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
      ...(body && {
        'Content-Type': 'application/json',
      }),
    },
    body: JSON.stringify(body),
    cache,
    next,
  })

  const parsedResponse = (await response.json()) as TData & { message: string }

  if (!response.ok) {
    if (parsedResponse.message === 'No device is currently playing') {
      return parsedResponse
    }

    console.error(parsedResponse)

    throw new Error(parsedResponse.message)
  }

  return parsedResponse
}
