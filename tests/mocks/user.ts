import { mockDeep } from 'vitest-mock-extended'

import { profileMock } from './profile'

import { idMock } from '.'

import { User } from '@app/api/types'

export const userMock = mockDeep<User>({
  id: idMock,
  profile: profileMock,
})
