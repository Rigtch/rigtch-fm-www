import { render } from '@testing-library/react'
import { useParams, useSearchParams } from 'next/navigation'
import type { Mock } from 'vitest'

import { Sidebar } from './sidebar'

import { ID } from '@app/constants'

vi.mock('next/navigation')

describe('Sidebar', () => {
  beforeEach(() => {
    vi.mocked(useParams).mockReturnValue({ [ID]: '1' })
    ;(vi.mocked(useSearchParams) as Mock).mockReturnValue({
      toString: vi.fn(),
      get: vi.fn().mockReturnValue('list'),
    })
  })

  test('should match snapshot', () => {
    const view = render(<Sidebar />)

    expect(view).toMatchSnapshot()
  })
})
