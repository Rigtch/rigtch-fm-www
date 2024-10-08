import type { SimplifiedUser, User } from './user'

export interface UserFollowing extends Pick<User, 'id'> {
  following: SimplifiedUser[]
}
