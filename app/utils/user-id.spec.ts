import { notFound } from 'next/navigation'
import { Mock } from 'vitest'

import { validateUserId } from './user-id'

vi.mock('next/navigation')

describe('validateUserId', () => {
  let notFoundMock: Mock

  beforeEach(() => {
    notFoundMock = vi.mocked(notFound)
  })

  test('should return validated userId', () => {
    const userId = '123e4567-e89b-12d3-a456-426614174000'

    expect(validateUserId(userId)).toBe(userId)
    expect(notFoundMock).not.toHaveBeenCalled()
  })

  test('should call notFound because userId is empty', () => {
    const userId = ''

    expect(validateUserId(userId)).toBe(undefined)
    expect(notFoundMock).toHaveBeenCalled()
  })

  test('should call notFound because userId is not a valid uuid', () => {
    const userId = '123'

    expect(validateUserId(userId)).toBe(undefined)
    expect(notFoundMock).toHaveBeenCalled()
  })
})
