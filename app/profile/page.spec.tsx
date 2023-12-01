import { render, screen } from '@testing-library/react'

import {
  ProfileRecentlyPlayedSection,
  ProfileTopArtistsSection,
  ProfileTopGenresSection,
  ProfileTopTracksSection,
} from './sections'
import ProfilePage from './page'

import { View } from '@app/types'
import { TimeRange } from '@app/api/types'
import { ToggleTimeRange } from '@app/components/common'

vi.mock('./sections')
vi.mock('@app/components/common')

describe('ProfilePage', () => {
  const profileRecentlyPlayed = 'ProfileRecentlyPlayed'
  const profileTopArtists = 'ProfileTopArtists'
  const profileTopGenres = 'ProfileTopGenres'
  const profileTopTracks = 'ProfileTopTracks'
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
