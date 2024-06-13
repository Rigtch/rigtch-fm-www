import { BackButton } from '@app/components/common/buttons'

export default function ProfileNotFound() {
  return (
    <div className="flex flex-col gap-6 p-4">
      <header className="flex flex-col gap-4">
        <h1 className="text-7xl">Whoops...</h1>

        <h2 className="text-4xl">
          We couldn&apos;t find the profile you were looking for.
        </h2>

        <p className="text-lg">
          This is probably because the user hasn&apos;t connected their Spotify
          account to rigtch.fm yet. Check if the provided URL is correct and try
          again.
        </p>
      </header>

      <main className="flex justify-end">
        <BackButton />
      </main>
    </div>
  )
}
