import { render, screen } from '@testing-library/react'
import { cookies } from 'next/headers'

import { ProfileAnalysisSection } from './analysis'

import { getAnalysis } from '@app/api/fetchers'
import { analysisMock } from '@tests/mocks/analysis'
import { ACCESS_TOKEN } from '@app/api/constants'

vi.mock('next/headers')
vi.mock('next/navigation')
vi.mock('@app/api/fetchers')

describe('ProfileAnalysisSection', () => {
  const accessTokenMock = 'accessToken'

  beforeEach(() => {
    vi.mocked(cookies, { partial: true }).mockReturnValue({
      get: () => ({
        name: ACCESS_TOKEN,
        value: accessTokenMock,
      }),
    })

    vi.mocked(getAnalysis).mockResolvedValue(analysisMock)
  })

  test('should render with header', async () => {
    render(await ProfileAnalysisSection({}))

    expect(screen.getByText('Analysis')).toBeInTheDocument()
  })

  test('should render with analysis data', async () => {
    render(await ProfileAnalysisSection({}))

    expect(getAnalysis).toHaveBeenCalledWith(accessTokenMock, {})

    expect(
      screen.getByText(`${((analysisMock.tempo / 260) * 100).toFixed(2)} BPM`)
    ).toBeInTheDocument()
  })

  test('should render with userId', async () => {
    const userId = 'userId'

    render(
      await ProfileAnalysisSection({
        userId,
      })
    )

    expect(getAnalysis).toHaveBeenCalledWith(accessTokenMock, {
      userId,
    })
  })
})
