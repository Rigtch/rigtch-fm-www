'use client'

import { Button } from './components/ui/button'

export interface GlobalErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  if (error.message === 'The access token expired') reset()

  return (
    <div>
      <h2>Oops, there is an error!</h2>
      <p>
        Please report this error to the developers so we can fix it. You can
        copy and paste the following into your report:
      </p>

      <pre>{error.stack}</pre>
      <Button onClick={reset}>Try again?</Button>
    </div>
  )
}
