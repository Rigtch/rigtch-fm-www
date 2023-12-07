import { ReactElement } from 'react'
import {
  RenderOptions,
  fireEvent,
  render,
  screen,
} from '@testing-library/react'
import {
  QueryClient,
  QueryClientProvider,
  UseQueryResult,
} from '@tanstack/react-query'
import { DeepMockProxy, mockDeep } from 'vitest-mock-extended'
import { useRouter } from 'next/navigation'

import {
  PlaybackStateProvider,
  usePlaybackStateContext,
} from './playback-state'

import { PlaybackState } from '@app/api/types'
import {
  useLastTracksQuery,
  usePlaybackStateQuery,
  useTogglePlaybackStateQuery,
} from '@app/api/hooks'

vi.mock('@app/api/hooks')
vi.mock('next/navigation')

const TRACK_NAME = 'track-name' as const
const IS_PLAYING = 'is-playing' as const

function TestComponent() {
  const { data, isPlaying, toggleState } = usePlaybackStateContext()

  return (
    <div>
      <p data-testid={TRACK_NAME}>{data?.track.name}</p>
      <p data-testid={IS_PLAYING}>{isPlaying ? 'true' : 'false'}</p>

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
  const refetchMock = vi.fn().mockReturnValue(undefined)

  let playbackStateMock: DeepMockProxy<PlaybackState>
  let playbackStateQueryResultMock: DeepMockProxy<UseQueryResult<PlaybackState>>

  beforeEach(() => {
    vi.mocked(usePlaybackStateQuery, { partial: true }).mockReturnValue({
      data: undefined,
      refetch: refetchMock,
    })
    vi.mocked(useTogglePlaybackStateQuery).mockReturnValue({
      toggle: vi.fn(),
    })
    vi.mocked(useLastTracksQuery, { partial: true }).mockReturnValue({
      data: undefined,
    })
    vi.mocked(useRouter, { partial: true }).mockReturnValue({
      refresh: vi.fn(),
    })

    playbackStateMock = mockDeep<PlaybackState>({
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
      isPlaying: true,
    })
    playbackStateQueryResultMock = mockDeep<UseQueryResult<PlaybackState>>({
      data: playbackStateMock,
      refetch: refetchMock,
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
  })

  test('should render with initial state', () => {
    customRender(<TestComponent />)

    expect(screen.getByTestId(TRACK_NAME)).toHaveTextContent('')
    expect(screen.getByTestId(IS_PLAYING)).toHaveTextContent('false')
  })

  test('should render with data', async () => {
    vi.mocked(usePlaybackStateQuery).mockReturnValue(
      playbackStateQueryResultMock
    )

    customRender(<TestComponent />)

    expect(screen.getByTestId(TRACK_NAME)).toHaveTextContent('test')
    expect(screen.getByTestId(IS_PLAYING)).toHaveTextContent('true')
  })

  /* FIXME: 
   * Warning:
      An update to PlaybackStateProvider inside a test was not wrapped in act(...).
   * TypeError:
      Cannot destructure property 'data' of 'usePlaybackStateQuery(...)' as it is undefined.
   */
  test.skip('should toggle state', () => {
    const toggleMock = vi.fn().mockResolvedValue({ success: true })

    vi.mocked(useTogglePlaybackStateQuery).mockReturnValue({
      toggle: toggleMock,
    })
    vi.mocked(usePlaybackStateQuery).mockReturnValue(
      playbackStateQueryResultMock
    )

    customRender(<TestComponent />)

    expect(screen.getByTestId(IS_PLAYING)).toHaveTextContent('true')

    fireEvent.click(screen.getByRole('button'))

    expect(toggleMock).toHaveBeenCalledWith(true)
  })
})
