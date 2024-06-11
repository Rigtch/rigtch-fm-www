'use client'

import { useRouter } from 'next/navigation'

import { Button } from '../ui/button'

export function GoBackButton() {
  const router = useRouter()

  return (
    <Button
      onClick={() => {
        router.back()
      }}
    >
      Go back
    </Button>
  )
}
