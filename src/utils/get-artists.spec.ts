import { getArtists } from './get-artists'

import { Artist } from '~/api/types'

const artistsMock: Pick<Artist, 'name'>[] = [
  { name: 'Artist 1' },
  { name: 'Artist 2' },
]

describe('Utils - getArtists', () => {
  test('returns empty string if artists is undefined', () => {
    expect(getArtists()).toEqual('')
  })

  test('returns empty string if artists is empty', () => {
    expect(getArtists([])).toEqual('')
  })

  test('returns string with artist name', () => {
    expect(getArtists(artistsMock.slice(0, 1))).toEqual('Artist 1')
  })

  test('returns string with artist names separated by comma', () => {
    expect(getArtists(artistsMock)).toEqual('Artist 1, Artist 2')
  })
})
