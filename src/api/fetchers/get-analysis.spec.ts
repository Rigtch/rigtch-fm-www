import { test, describe, vi, expect, Mock } from 'vitest'

import { getAnalysis } from './get-analysis'
import { fetchApi } from './fetch-api'

import { analysisMock } from '@tests/mocks'

vi.mock('./fetch-api')

describe('getAnalysis', () => {
  beforeEach(() => {
    ;(fetchApi as Mock).mockResolvedValue(analysisMock)
  })

  test('should get analysis', async () => {
    const analysis = await getAnalysis()

    expect(analysis).toEqual(analysisMock)
  })
})
