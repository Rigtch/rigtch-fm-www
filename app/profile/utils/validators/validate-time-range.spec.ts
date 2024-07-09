import { StatsProvider } from '../../types'

import { validateTimeRange } from './validate-time-range'

import { RigtchTimeRange, SpotifyTimeRange } from '@app/api/types'

describe('validateTimeRange', () => {
  const spotifyTimeRange = SpotifyTimeRange.MEDIUM_TERM
  const rigtchTimeRange = RigtchTimeRange.TWO_WEEKS
  const invalid = 'invalid'

  describe('With Spotify provider', () => {
    test('should return timeRange when timeRange is a SpotifyTimeRange', () => {
      expect(
        validateTimeRange(spotifyTimeRange, StatsProvider.SPOTIFY)
      ).toEqual(spotifyTimeRange)
    })

    test('should return SpotifyTimeRange.SHORT_TERM when timeRange is not a SpotifyTimeRange', () => {
      expect(validateTimeRange(invalid, StatsProvider.SPOTIFY)).toEqual(
        SpotifyTimeRange.SHORT_TERM
      )
    })
  })

  describe('With Rigtch provider', () => {
    test('should return timeRange when timeRange is a RigtchTimeRange', () => {
      expect(validateTimeRange(rigtchTimeRange, StatsProvider.RIGTCH)).toEqual(
        rigtchTimeRange
      )
    })

    test('should return RigtchTimeRange.WEEK when timeRange is not a RigtchTimeRange', () => {
      expect(validateTimeRange(invalid, StatsProvider.RIGTCH)).toEqual(
        RigtchTimeRange.WEEK
      )
    })
  })
})
