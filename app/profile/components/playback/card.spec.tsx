import { render, screen } from '@testing-library/react'
import { DeepMockProxy, mockDeep } from 'vitest-mock-extended'

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

  const toggleStateMock = vi.fn()

  let dataMock: DeepMockProxy<PlaybackStateData>

  beforeEach(() => {
    dataMock = mockDeep<PlaybackStateData>({
      track: {
        name: trackName,
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
})
