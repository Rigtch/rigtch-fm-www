import { ReadonlyURLSearchParams } from 'next/navigation'

export function formatSearchParams(
  searchParams: ReadonlyURLSearchParams,
  key?: string,
  value?: string
) {
  const urlSearchParams = new URLSearchParams({
    ...Object.fromEntries(Array.from(searchParams.entries())),
  })

  key && value && urlSearchParams.set(key, value)

  return urlSearchParams.toString()
}
