import { notFound } from 'next/navigation'
import { MockedFunction } from 'vitest'

import { validateId } from './validate-id'

vi.mock('next/navigation')

describe('validateId', () => {
  let notFoundMock: MockedFunction<typeof notFound>

  beforeEach(() => {
    notFoundMock = vi.mocked(notFound)
  })

  test('should return validated userId', () => {
    const userId = '123e4567-e89b-12d3-a456-426614174000'

    expect(validateId(userId)).toBe(userId)
    expect(notFoundMock).not.toHaveBeenCalled()
  })

  test('should call notFound because userId is empty', () => {
    const userId = ''

    expect(validateId(userId)).toBe(undefined)
    expect(notFoundMock).toHaveBeenCalled()
  })

  test('should call notFound because userId is not a valid uuid', () => {
    const userId = '123'

    expect(validateId(userId)).toBe(undefined)
    expect(notFoundMock).toHaveBeenCalled()
  })
})
