import { formatArtists } from './artists'

describe('(Utils) - Formatters/Artists', () => {
  describe('formatArtists', () => {
    test('should return artists names separated by comma', () => {
      const artists = [{ name: 'artist1' }, { name: 'artist2' }]

      expect(formatArtists(artists)).toEqual('artist1, artist2')
    })

    test('should return empty string when artists is undefined', () => {
      expect(formatArtists()).toEqual('')
    })
  })
})
