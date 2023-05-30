import Link from 'next/link'

export function Footer() {
  return (
    <footer className="flex-column surface-card border-round-sm flex gap-3 px-4 py-4">
      <div className="justify-content-center flex w-full">
        <Link
          href="https://discord.gg/ft9RUtyfZg"
          target="_blank"
          style={{ all: 'unset', cursor: 'pointer' }}
        >
          <span className="pi pi-discord" style={{ fontSize: '2rem' }}></span>
        </Link>
      </div>

      <div className="flex-justify-content-center w-full">
        <span className="justify-content-center text-md flex">
          Rigtch {new Date().getFullYear()} &copy; All right reserved.
        </span>
      </div>
    </footer>
  )
}
