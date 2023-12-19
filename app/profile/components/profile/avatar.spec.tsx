import { render, screen } from '@testing-library/react'

import { ProfileAvatar } from './avatar'

describe('ProfileAvatar', () => {
  const displayName = 'test'

  test('should render with props', () => {
    render(<ProfileAvatar displayName={displayName} />)

    expect(screen.getByText(displayName.slice(0, 1))).toBeInTheDocument()
  })

  test('should render without props', () => {
    render(<ProfileAvatar />)

    expect(screen.queryByText(displayName.slice(0, 1))).not.toBeInTheDocument()
  })

  test('should render with size', () => {
    render(<ProfileAvatar displayName={displayName} size="lg" />)

    const avatarComponent = screen.queryAllByRole('generic')[2]

    expect(screen.getByText(displayName.slice(0, 1))).toBeInTheDocument()
    expect(avatarComponent).toHaveClass('w-[128px] h-[128px]')
  })
})
