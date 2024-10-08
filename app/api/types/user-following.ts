import type { Profile } from './profile'
import type { User } from './user'

export interface UserFollowing extends Pick<User, 'id'> {
  following: (Pick<User, 'id'> & {
    profile: Pick<Profile, 'displayName' | 'images' | 'href'>
  })[]
}
