export type SpotifyResponse<T = unknown, D = false> = {
  href: string
  limit: number
  next: string
  items: T[]
} & (D extends true ? { offset: number } : object)
