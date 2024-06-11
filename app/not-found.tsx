import { GoBackButton } from './components/common'

export default function NotFound() {
  return (
    <div className="relative flex flex-col overflow-hidden items-center justify-center gap-6 w-full h-[600px]">
      <span className="text-[200px] md:text-[600px] absolute opacity-[0.1]">
        404
      </span>

      <header className="flex flex-col items-center w-full gap-6">
        <h1 className="text-8xl text-center">Page not found</h1>

        <h2 className="text-2xl">
          Are you sure you&apos;re in the right place?
        </h2>
      </header>

      <main className="flex z-10">
        <GoBackButton />
      </main>
    </div>
  )
}
