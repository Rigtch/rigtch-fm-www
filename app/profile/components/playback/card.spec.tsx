import { render, screen } from '@testing-library/react'
import { DeepMockProxy, mockDeep } from 'vitest-mock-extended'
import { DateTime } from 'luxon'

import { PlaybackCard } from './card'

import {
  PlaybackStateData,
  usePlaybackStateContext,
} from '@app/context/playback-state'

vi.mock('@app/context/playback-state')

describe('PlaybackCard', () => {
  const trackName = 'track 1'
  const albumName = 'album 1'
  const deviceName = 'device 1'
  const artistName = 'artist 1'
  const relativeTime = '2016-05-25T09:08:34.123+06:00'

  const toggleStateMock = vi.fn()

  let dataMock: DeepMockProxy<PlaybackStateData>

  beforeEach(() => {
    dataMock = mockDeep<PlaybackStateData>({
      track: {
        name: trackName,
        playedAt: relativeTime,
        album: {
          name: albumName,
          images: [
            {
              url: '/url',
            },
          ],
        },
        artists: [
          {
            name: artistName,
          },
        ],
      },
      device: {
        name: deviceName,
      },
    })
  })

  test('should render without data', () => {
    vi.mocked(usePlaybackStateContext).mockReturnValue({
      data: undefined,
      isPlaying: false,
      toggleState: toggleStateMock,
    })

    render(<PlaybackCard />)

    // eslint-disable-next-line testing-library/no-node-access
    expect(document.querySelector('.animate-pulse')).toBeInTheDocument()
  })

  test('should render with data', () => {
    vi.mocked(usePlaybackStateContext).mockReturnValue({
      data: dataMock,
      isPlaying: false,
      toggleState: toggleStateMock,
    })

    render(<PlaybackCard />)

    expect(screen.getByText(trackName)).toBeInTheDocument()
    expect(screen.getByText(artistName)).toBeInTheDocument()
  })

  test('should render with relative time', () => {
    vi.mocked(usePlaybackStateContext).mockReturnValue({
      data: { ...dataMock, device: undefined },
      isPlaying: false,
      toggleState: toggleStateMock,
    })

    render(<PlaybackCard />)

    const time = DateTime.fromISO(relativeTime).toRelative() ?? relativeTime

    expect(screen.getByText(time)).toBeInTheDocument()
  })
})
