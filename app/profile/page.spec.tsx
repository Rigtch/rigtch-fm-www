import { render, screen } from '@testing-library/react'
import { cookies } from 'next/headers'

import {
  ProfileRecentlyPlayedSection,
  ProfileTopArtistsSection,
  ProfileTopGenresSection,
  ProfileTopTracksSection,
  ProfileAnalysisSection,
} from './sections'
import ProfilePage from './page'

import { View } from '@app/types'
import { TimeRange } from '@app/api/types'
import { ToggleTimeRange } from '@app/components/common'
import { ACCESS_TOKEN } from '@app/api/constants'

vi.mock('./sections')
vi.mock('@app/components/common')
vi.mock('next/headers')

describe('ProfilePage', () => {
  const accessTokenMock = 'accessToken'
  const profileRecentlyPlayed = 'ProfileRecentlyPlayed'
  const profileTopArtists = 'ProfileTopArtists'
  const profileTopGenres = 'ProfileTopGenres'
  const profileTopTracks = 'ProfileTopTracks'
  const profileAnalysis = 'ProfileAnalysis'
  const searchParams = {
    time_range: TimeRange.SHORT_TERM,
    view: View.CARD,
  }

  beforeEach(() => {
    vi.mocked(ToggleTimeRange).mockReturnValue(<div>ToggleTimeRange</div>)
    vi.mocked(ProfileTopGenresSection).mockReturnValue(
      //@ts-expect-error: Error: Objects are not valid as a React child (found: [object Promise]).
      <div>{profileTopGenres}</div>
    )
    vi.mocked(ProfileTopArtistsSection).mockReturnValue(
      //@ts-expect-error: Error: Objects are not valid as a React child (found: [object Promise]).
      <div>{profileTopArtists}</div>
    )
    vi.mocked(ProfileTopTracksSection).mockReturnValue(
      //@ts-expect-error: Error: Objects are not valid as a React child (found: [object Promise]).
      <div>{profileTopTracks}</div>
    )
    vi.mocked(ProfileRecentlyPlayedSection).mockReturnValue(
      //@ts-expect-error: Error: Objects are not valid as a React child (found: [object Promise]).
      <div>{profileRecentlyPlayed}</div>
    )
    vi.mocked(ProfileAnalysisSection).mockReturnValue(
      //@ts-expect-error: Error: Objects are not valid as a React child (found: [object Promise]).
      <div>{profileAnalysis}</div>
    )
    vi.mocked(cookies, { partial: true }).mockReturnValue({
      get: () => ({
        name: ACCESS_TOKEN,
        value: accessTokenMock,
      }),
    })
  })

  test('should render with sections', async () => {
    render(
      await ProfilePage({
        searchParams,
      })
    )

    expect(screen.getByText(profileTopGenres)).toBeInTheDocument()
    expect(screen.getByText(profileTopArtists)).toBeInTheDocument()
    expect(screen.getByText(profileTopTracks)).toBeInTheDocument()
    expect(screen.getByText(profileAnalysis)).toBeInTheDocument()
    expect(screen.getByText(profileRecentlyPlayed)).toBeInTheDocument()
  })

  test('should show boundary if section throws', async () => {
    vi.mocked(ProfileTopGenresSection).mockImplementation(() => {
      throw new Error('error')
    })

    render(
      await ProfilePage({
        searchParams,
      })
    )

    expect(screen.getByText('Oops, there is an error!')).toBeInTheDocument()
  })
})
