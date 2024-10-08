import type { Profile } from './profile'
import type { User } from './user'

export interface UserFollowers extends Pick<User, 'id'> {
  followers: (Pick<User, 'id'> & {
    profile: Pick<Profile, 'displayName' | 'images' | 'href'>
  })[]
}
