import { ReadonlyURLSearchParams } from 'next/navigation'

import { formatSearchParams } from './format-search-params'

describe('formatSearchParams', () => {
  test('should return search params string', () => {
    const searchParams = new ReadonlyURLSearchParams(
      new URLSearchParams({
        offset: '0',
      })
    )

    expect(formatSearchParams(searchParams, 'market', 'BR')).toBe(
      'offset=0&market=BR'
    )
  })
})
