'use client'

import { useState, useEffect } from 'react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@app/components/ui/dialog'
import { Button } from '@app/components/ui/button'
import {
  acceptUserCookiesAction,
  declineUserCookiesAction,
} from '@app/actions/user-cookies'

namespace CookiesDialog {
  export interface Props {
    isAccepted: boolean
  }
}

function CookiesDialog({ isAccepted }: CookiesDialog.Props) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted || isAccepted) return null

  return (
    <Dialog defaultOpen>
      <DialogContent
        className="max-w-[300px]"
        onPointerDownOutside={event => {
          event.preventDefault()
        }}
      >
        <DialogHeader className="flex flex-col gap-2">
          <DialogTitle>We value your privacy</DialogTitle>

          <DialogDescription>
            We use cookies to save user data. By clicking &quot;Accept&quot; you
            consent to our use of cookies
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-row justify-between w-full">
          <form action={declineUserCookiesAction}>
            <Button type="submit" variant="secondary">
              Decline
            </Button>
          </form>

          <form action={acceptUserCookiesAction}>
            <DialogClose asChild>
              <Button
                className="bg-purple-800 hover:bg-purple-900"
                type="submit"
              >
                Accept
              </Button>
            </DialogClose>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { CookiesDialog }
