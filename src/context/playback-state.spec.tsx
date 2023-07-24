import { Mock, describe, test, vi } from 'vitest'
import { ReactElement } from 'react'
import { RenderOptions, render, screen } from '@testing-library/react'
import {
  QueryClient,
  QueryClientProvider,
  UseQueryResult,
} from '@tanstack/react-query'
import { mock } from 'vitest-mock-extended'

import {
  PlaybackStateProvider,
  usePlaybackStateContext,
} from './playback-state'

import { PlaybackState, Track } from '@api/types'
import {
  useLastTracksQuery,
  usePlaybackStateQuery,
  useTogglePlaybackStateQuery,
} from '@hooks/api'

vi.mock('@hooks/api')

function TestComponent() {
  const { data, isPlaying, toggleState } = usePlaybackStateContext()

  return (
    <div>
      <p data-testid="track-name">{data?.track.name}</p>
      <p data-testid="album-image">{data?.albumImage}</p>
      <p data-testid="is-playing">{isPlaying ? 'true' : 'false'}</p>

      <button onClick={() => toggleState()}>toggle</button>
    </div>
  )
}

const customRender = (ui: ReactElement, renderOptions?: RenderOptions) => {
  const queryClient = new QueryClient()

  render(
    <QueryClientProvider client={queryClient}>
      <PlaybackStateProvider>{ui}</PlaybackStateProvider>
    </QueryClientProvider>,
    renderOptions
  )
}

describe('PlaybackStateContext', () => {
  beforeEach(() => {
    ;(usePlaybackStateQuery as Mock).mockReturnValue({
      data: undefined,
      refetch: vi.fn(),
    })
    ;(useTogglePlaybackStateQuery as Mock).mockReturnValue({
      toggle: vi.fn(),
    })
    ;(useLastTracksQuery as Mock).mockReturnValue({
      data: undefined,
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
  })

  test('should render with initial state', () => {
    customRender(<TestComponent />)

    expect(screen.getByTestId('track-name')).toHaveTextContent('')
    expect(screen.getByTestId('album-image')).toHaveTextContent('')
    expect(screen.getByTestId('is-playing')).toHaveTextContent('false')
  })

  test('should render with data', async () => {
    ;(usePlaybackStateQuery as Mock).mockReturnValue({
      data: mock<PlaybackState>({
        track: {
          name: 'test',
          album: {
            images: [
              {
                url: 'test',
              },
            ],
          },
        },
      }),
      refetch: vi.fn(),
    })

    customRender(<TestComponent />)

    expect(screen.getByTestId('track-name')).toHaveTextContent('test')
    expect(screen.getByTestId('album-image')).toHaveTextContent('test')
    expect(screen.getByTestId('is-playing')).toHaveTextContent('true')
  })

  test('should render with data from last track', async () => {
    ;(useLastTracksQuery as Mock).mockReturnValue({
      data: [
        {
          name: 'test',
          album: {
            images: [
              {
                url: 'test',
              },
            ],
          },
        },
      ],
    } as unknown as UseQueryResult<Track[], unknown>)

    customRender(<TestComponent />)

    expect(screen.getByTestId('track-name')).toHaveTextContent('test')
    expect(screen.getByTestId('album-image')).toHaveTextContent('test')
    expect(screen.getByTestId('is-playing')).toHaveTextContent('false')
  })

  test('should toggle state', async () => {
    const toggleMock = vi.fn().mockResolvedValue({ success: true })

    ;(usePlaybackStateQuery as Mock).mockReturnValue({
      data: mock<PlaybackState>({
        track: {
          name: 'test',
        },
        isPlaying: true,
      }),
      refetch: vi.fn(),
    })
    ;(useTogglePlaybackStateQuery as Mock).mockReturnValue({
      toggle: toggleMock,
    })

    customRender(<TestComponent />)

    expect(screen.getByTestId('is-playing')).toHaveTextContent('true')

    await screen.getByRole('button').click()

    expect(toggleMock).toHaveBeenCalledWith(true)
  })
})
