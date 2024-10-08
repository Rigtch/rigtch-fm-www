import { ProfileAvatar } from '../profile'

import type { SimplifiedUser } from '@app/api/types'
import { SpotifyLink } from '@app/components/common'
import { LinkButton } from '@app/components/common/buttons'

namespace UsersList {
  export type Props = Readonly<{
    items: SimplifiedUser[]
  }>
}

function UsersList({ items }: UsersList.Props) {
  return (
    <div className="flex flex-col gap-2">
      {items.map(({ id, profile: { displayName, images, href } }) => (
        <div
          key={id}
          className="flex gap-2 rounded-md bg-primary-light p-2 hover:bg-primary-lighter"
        >
          <ProfileAvatar
            src={images[0]?.url}
            size="sm"
            displayName={displayName}
          />

          <div className="flex items-center gap-2">
            <LinkButton href={`/profile/${id}`} className="text-xl text-white">
              {displayName}
            </LinkButton>

            <SpotifyLink href={href} />
          </div>
        </div>
      ))}
    </div>
  )
}

export { UsersList }
