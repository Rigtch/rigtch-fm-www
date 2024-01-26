'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCookies } from 'react-cookie'

import { USER_ACCEPT_COOKIES } from './api/constants'

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

export interface CookiesDialogProps {
  isAccepted: boolean
}

export function CookiesDialog({ isAccepted }: CookiesDialogProps) {
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)

  const [, setAcceptCookies] = useCookies([USER_ACCEPT_COOKIES])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted || isAccepted) {
    return null
  }

  return (
    <Dialog defaultOpen>
      <DialogContent className="max-w-[300px]">
        <DialogHeader className="flex flex-col gap-2">
          <DialogTitle>We value your privacy</DialogTitle>

          <DialogDescription>
            We use cookies to save user data. By clicking &quot;Accept&quot; you
            consent to our use of cookies
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-row justify-between w-full">
          <DialogClose
            asChild
            onClick={() => {
              setAcceptCookies(USER_ACCEPT_COOKIES, true, { path: '/' })
            }}
          >
            <Button type="button">Accept</Button>
          </DialogClose>

          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              router.push('https://google.com')
            }}
          >
            Decline
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
