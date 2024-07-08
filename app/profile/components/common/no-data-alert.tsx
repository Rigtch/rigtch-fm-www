import { HiOutlineEmojiSad } from 'react-icons/hi'

import { Alert, AlertDescription, AlertTitle } from '@app/components/ui/alert'

export function NoDataAlert() {
  return (
    <Alert variant="destructive">
      <HiOutlineEmojiSad className="h-5 w-5" />

      <AlertTitle>No Data</AlertTitle>

      <AlertDescription>
        Oops... Looks like nothing&apos;s there yet.
      </AlertDescription>
    </Alert>
  )
}
