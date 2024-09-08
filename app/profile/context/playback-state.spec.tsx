import { render, screen } from '@testing-library/react'
import { useRouter } from 'next/navigation'

import { usePlaybackStateContext } from './playback-state'

import {
  usePlaybackStateQuery,
  useRecentlyPlayedQuery,
  useTogglePlaybackStateQuery,
} from '@app/api/hooks'
import { QueryClientWrapper } from '@tests/utils'

vi.mock('@app/api/hooks')
vi.mock('next/navigation')

const TRACK_NAME = 'track-name'
const IS_PLAYING = 'is-playing'

function TestComponent() {
  const { data, isPlaying, toggleState } = usePlaybackStateContext()

  return (
    <div>
      <p data-testid={TRACK_NAME}>{data?.track.name}</p>
      <p data-testid={IS_PLAYING}>{isPlaying ? 'true' : 'false'}</p>

      <button onClick={() => void toggleState()}>toggle</button>
    </div>
  )
}

describe('PlaybackStateContext', () => {
  const refetchMock = vi.fn().mockReturnValue(undefined)

  beforeEach(() => {
    vi.mocked(usePlaybackStateQuery, { partial: true }).mockReturnValue({
      data: undefined,
      refetch: refetchMock,
    })
    vi.mocked(useTogglePlaybackStateQuery).mockReturnValue({
      toggle: vi.fn(),
    })
    vi.mocked(useRecentlyPlayedQuery, { partial: true }).mockReturnValue({
      data: undefined,
    })
    vi.mocked(useRouter, { partial: true }).mockReturnValue({
      refresh: vi.fn(),
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
  })

  test('should render with initial state', () => {
    render(<TestComponent />, {
      wrapper: QueryClientWrapper,
    })

    expect(screen.getByTestId(TRACK_NAME)).toHaveTextContent('')
    expect(screen.getByTestId(IS_PLAYING)).toHaveTextContent('false')
  })
})
