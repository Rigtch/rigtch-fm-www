import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { TooltipInfo } from './tooltip-info'

const TestComponent = () => (
  <TooltipInfo title="Tooltip">Tooltip content</TooltipInfo>
)

describe('TooltipInfo', () => {
  test('should match snapshot', () => {
    const view = render(<TestComponent />)

    expect(view).toMatchSnapshot()
  })

  test('should show tooltip content on hover', async () => {
    render(<TestComponent />)

    const button = screen.getByRole('button')
    const user = userEvent.setup()

    expect(screen.queryByText('Tooltip content')).not.toBeInTheDocument()

    await user.hover(button)

    const [tooltipContent] = await screen.findAllByText('Tooltip content')

    expect(tooltipContent).toBeInTheDocument()
  })
})
