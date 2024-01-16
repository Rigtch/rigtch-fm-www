import Link from 'next/link'

import { Button } from '@app/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-6 w-full">
      <header className="flex flex-col items-center w-1/2 gap-6">
        <h1 className="text-8xl">Page not found</h1>

        <h2 className="text-2xl">
          Are you sure you&apos;re in the right place?
        </h2>
      </header>

      <main className="flex">
        <Button>
          <Link href="/profile">Go back</Link>
        </Button>
      </main>
    </div>
  )
}
