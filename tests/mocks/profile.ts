import { mockDeep } from 'vitest-mock-extended'

import { imagesMock } from './images'

import { hrefMock } from '.'

import { Profile } from '@app/api/types'

export const displayNameMock = 'John Doe'
export const followersMock = 100

export const profileMock = mockDeep<Profile>({
  displayName: displayNameMock,
  followers: followersMock,
  href: hrefMock,
  images: imagesMock,
})
