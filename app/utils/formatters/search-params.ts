export function formatSearchParams(
  searchParams: URLSearchParams,
  key?: string,
  value?: string
) {
  const urlSearchParams = new URLSearchParams({
    ...Object.fromEntries(Array.from(searchParams.entries())),
  })

  key && value && urlSearchParams.set(key, value)

  return urlSearchParams.toString()
}
