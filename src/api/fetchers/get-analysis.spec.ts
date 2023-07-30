import { test, describe, vi, expect } from 'vitest'

import { getAnalysis } from './get-analysis'

import { analysisMock } from '@tests/mocks'

describe('getAnalysis', () => {
  test('should return response', async () => {
    vi.stubGlobal('fetch', () => ({
      status: 200,
      json: () => analysisMock,
    }))

    const analysis = await getAnalysis()

    expect(analysis).toEqual(analysisMock)
  })

  test('should throw error when status is 401', () => {
    vi.stubGlobal('fetch', () => ({
      status: 401,
      statusText: 'Unauthorized',
    }))

    expect(getAnalysis()).rejects.toThrow('Unauthorized')
  })
})
