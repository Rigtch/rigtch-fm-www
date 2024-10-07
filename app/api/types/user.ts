import type { Profile } from './profile'

export interface User {
  id: string
  profile: Profile
  followersCount: number
  followingCount: number
  createdAt?: Date
}
