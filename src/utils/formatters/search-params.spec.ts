import { ReadonlyURLSearchParams } from 'next/navigation'

import { formatSearchParams } from './search-params'

describe('(Utils) - Formatters/SearchParams', () => {
  describe('formatSearchParams', () => {
    test('should return search params string', () => {
      const searchParams = new ReadonlyURLSearchParams(
        new URLSearchParams({
          offset: '0',
        })
      )

      expect(formatSearchParams(searchParams, 'market', 'BR')).toEqual(
        'offset=0&market=BR'
      )
    })
  })
})
