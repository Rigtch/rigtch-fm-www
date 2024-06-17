import { useRouter } from 'next/navigation'
import { MockInstance } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { BackButton } from './back-button'

vi.mock('next/navigation')

describe('BackButton', () => {
  let routerSpy: MockInstance
  let backSpy: MockInstance

  beforeEach(() => {
    backSpy = vi.fn()

    routerSpy = vi.mocked(useRouter)

    routerSpy.mockReturnValue({
      back: backSpy,
    })
  })

  test('should match snapshot', () => {
    const view = render(<BackButton />)

    expect(view).toMatchSnapshot()
  })

  test('should call router.back()', async () => {
    render(<BackButton />)

    const user = userEvent.setup()

    await user.click(screen.getByRole('button'))

    expect(backSpy).toHaveBeenCalled()
  })
})
