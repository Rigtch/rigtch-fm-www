import { BackButton } from './components/common/buttons'

export default function NotFound() {
  return (
    <div className="relative flex h-[600px] w-full flex-col items-center justify-center gap-6 overflow-hidden">
      <span className="absolute text-[200px] opacity-[0.1] md:text-[600px]">
        404
      </span>

      <header className="flex w-full flex-col items-center gap-6">
        <h1 className="text-center text-8xl">Page not found</h1>

        <h2 className="text-2xl">
          Are you sure you&apos;re in the right place?
        </h2>
      </header>

      <main className="z-10 flex">
        <BackButton />
      </main>
    </div>
  )
}
