import { render, screen } from '@testing-library/react'
import userEvent, { type UserEvent } from '@testing-library/user-event'

import { PlaybackToggleStateButton } from './toggle-state-button'

describe('PlaybackToggleStateButton', () => {
  let user: UserEvent

  beforeEach(() => {
    user = userEvent.setup()
  })

  test('should match snapshot as resumed', () => {
    const view = render(
      <PlaybackToggleStateButton
        isPlaying={true}
        isDeviceAvailable={true}
        hasAccess={true}
        toggleState={() => Promise.resolve()}
      />
    )

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot as paused', () => {
    const view = render(
      <PlaybackToggleStateButton
        isPlaying={false}
        isDeviceAvailable={true}
        hasAccess={true}
        toggleState={() => Promise.resolve()}
      />
    )

    expect(view).toMatchSnapshot()
  })

  test('should match snapshot as disabled', () => {
    const view = render(
      <PlaybackToggleStateButton
        isPlaying={true}
        isDeviceAvailable={false}
        hasAccess={false}
        toggleState={() => Promise.resolve()}
      />
    )

    expect(view).toMatchSnapshot()
  })

  test('should call toggleState when clicked', async () => {
    const toggleState = vi.fn()

    render(
      <PlaybackToggleStateButton
        isPlaying={true}
        isDeviceAvailable={true}
        hasAccess={true}
        toggleState={toggleState}
      />
    )

    await user.click(screen.getByRole('button'))

    expect(toggleState).toHaveBeenCalled()
  })
})
