import { render, screen } from '@testing-library/react'
import { Mock, describe, vi } from 'vitest'
import { mock } from 'vitest-mock-extended'

import { ProfileCard } from './card'

import { useProfileQuery } from '@hooks/api'
import { Profile } from '@api/types'

vi.mock('@hooks/api')

describe('ProfileCard', () => {
  beforeEach(() => {
    ;(useProfileQuery as Mock).mockReturnValue({
      data: mock<Profile>({
        displayName: 'John Doe',
        followers: 100,
        href: 'https://spotify.com',
        images: [
          {},
          {
            url: 'https://spotify.com/image.png',
          },
        ],
      }),
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
  })

  test('should render profile card with data', () => {
    render(<ProfileCard />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('100 Followers')).toBeInTheDocument()
  })

  test('should render profile card without data', () => {
    ;(useProfileQuery as Mock).mockReturnValue({ data: undefined })

    render(<ProfileCard />)

    expect(screen.queryByText('John Doe')).not.toBeInTheDocument()
    expect(screen.queryByText('100 Followers')).not.toBeInTheDocument()
  })
})
