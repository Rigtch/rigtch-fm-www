import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MockInstance } from 'vitest'
import { useRouter, useSearchParams } from 'next/navigation'
import { act } from 'react'

import { SelectView } from './select-view'

import { View } from '@app/types'

vi.mock('next/navigation')

describe('SelectView', () => {
  let routerSpy: MockInstance
  let searchParamsSpy: MockInstance

  beforeEach(() => {
    routerSpy = vi.mocked(useRouter)
    searchParamsSpy = vi.mocked(useSearchParams)
  })

  test('should match snapshot', () => {
    const view = render(<SelectView initialValue={View.CARD} />)

    expect(view).toMatchSnapshot()
  })

  test('should change view', async () => {
    const pushSpy = vi.fn()
    const searchParams = new URLSearchParams()

    routerSpy.mockReturnValue({ push: pushSpy })
    searchParamsSpy.mockReturnValue(searchParams)

    render(<SelectView initialValue={View.CARD} />)

    const user = userEvent.setup()

    const selectButton = screen.getByRole('combobox')

    await act(async () => {
      await user.click(selectButton)
    })

    await act(async () => {
      await user.click(screen.getByRole('option', { name: 'List' }))
    })

    expect(selectButton).toHaveTextContent('List')
  })
})
