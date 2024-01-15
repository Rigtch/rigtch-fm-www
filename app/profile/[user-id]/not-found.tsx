import Link from 'next/link'

import { Button } from '@app/components/ui/button'

export default function ProfileNotFound() {
  return (
    <div>
      <header>
        <h2>Not Found</h2>

        <p>Sorry, but profile with given uuid has not been found.</p>
      </header>

      <Button>
        <Link href="/profile">My Profile</Link>
      </Button>
    </div>
  )
}
