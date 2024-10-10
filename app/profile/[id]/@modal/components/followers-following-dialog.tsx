'use client'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

import type { SimplifiedUser } from '@app/api/types'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@app/components/ui/dialog'
import { Tabs, TabsList, TabsTrigger } from '@app/components/ui/tabs'
import { UsersList } from '@app/profile/components/user'
import type { ParamsWithId } from '@app/types'

const tabs = ['Followers', 'Following'] as const

type Routes = Lowercase<(typeof tabs)[number]>

namespace FollowersFollowingDialog {
  export type Props = Readonly<{
    desiredRoute: Routes
    items: SimplifiedUser[]
  }>
}

function FollowersFollowingDialog({
  desiredRoute,
  items,
}: FollowersFollowingDialog.Props) {
  const { id } = useParams<ParamsWithId>()
  const router = useRouter()

  return (
    <Dialog
      defaultOpen={true}
      open={true}
      onOpenChange={isOpen => {
        if (!isOpen) router.push(`/profile/${id}`)
      }}
    >
      <DialogContent className="dark" animate={false}>
        <DialogTitle className="hidden">{desiredRoute}</DialogTitle>
        <DialogDescription className="hidden">
          User&apos;s {desiredRoute}
        </DialogDescription>

        <Tabs defaultValue={desiredRoute}>
          <TabsList className="w-full">
            {tabs.map(tab => (
              <TabsTrigger
                key={tab}
                value={tab.toLowerCase()}
                className="w-full"
                asChild
              >
                <Link
                  href={`/profile/${id}/${tab.toLowerCase()}`}
                  as={`/profile/${id}/${tab.toLowerCase()}`}
                  replace
                  prefetch
                >
                  {tab}
                </Link>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <UsersList items={items} />
      </DialogContent>
    </Dialog>
  )
}

export { FollowersFollowingDialog }
