import { render, screen } from '@testing-library/react'
import { UserEvent, userEvent } from '@testing-library/user-event'
import { usePathname, useRouter } from 'next/navigation'

import { SelectView } from './select-view'

import { View } from '@common/types'
import { formatSearchParams } from '@utils/formatters'

vi.mock('next/navigation')
vi.mock('@utils/formatters')

describe('SelectView', () => {
  let user: UserEvent

  beforeEach(() => {
    user = userEvent.setup()
  })

  test('should render', () => {
    render(<SelectView initialValue={View.CARD} />)

    expect(screen.getByText('Card')).toBeInTheDocument()
  })

  test('should show items on focus', async () => {
    render(<SelectView initialValue={View.CARD} />)

    const select = screen.getByRole('combobox')

    await user.click(select)

    expect(screen.getAllByText('Card')[0]).toBeInTheDocument()
    expect(screen.getByText('List')).toBeInTheDocument()
  })

  test('should call `handleOnValueChange` on change', async () => {
    const pathname = '/pathname'
    const searchParams = 'searchParams'

    const pushMock = vi.fn()

    vi.mocked(usePathname).mockReturnValue(pathname)
    vi.mocked(useRouter, { partial: true }).mockReturnValue({
      push: pushMock,
    })
    vi.mocked(formatSearchParams).mockReturnValue(searchParams)

    render(<SelectView initialValue={View.CARD} />)

    const select = screen.getByRole('combobox')

    await user.click(select)

    const listOption = screen.getByText('List')

    await user.click(listOption)

    expect(pushMock).toHaveBeenCalledWith(`${pathname}?${searchParams}`, {
      scroll: true,
    })
  })
})
