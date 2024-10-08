import type { Profile, SimplifiedProfile } from './profile'

export interface User {
  id: string
  profile: Profile
  followersCount: number
  followingCount: number
  createdAt?: Date
}

export type SimplifiedUser = Pick<User, 'id'> & {
  profile: SimplifiedProfile
}
