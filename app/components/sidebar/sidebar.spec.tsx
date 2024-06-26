import { render } from '@testing-library/react'
import { useParams, useSearchParams } from 'next/navigation'
import type { Mock } from 'vitest'

import { Sidebar } from './sidebar'

import { USER_ID } from '@app/constants'

vi.mock('next/navigation')

describe('Sidebar', () => {
  beforeEach(() => {
    vi.mocked(useParams).mockReturnValue({ [USER_ID]: '1' })
    ;(vi.mocked(useSearchParams) as Mock).mockReturnValue({ toString: vi.fn() })
  })

  test('should match snapshot', () => {
    const view = render(<Sidebar />)

    expect(view).toMatchSnapshot()
  })
})
