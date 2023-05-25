import Link from 'next/link'

export function Footer() {
  return (
    <footer className="flex flex-column px-4 py-4 surface-card border-round-sm gap-3">
      <div className="flex justify-content-center w-full">
        <Link
          href="https://discord.gg/ft9RUtyfZg"
          target="_blank"
          style={{ all: 'unset', cursor: 'pointer' }}
        >
          <span className="pi pi-discord" style={{ fontSize: '2rem' }}></span>
        </Link>
      </div>

      <div className="flex-justify-content-center w-full">
        <span className="flex justify-content-center text-md">
          Rigtch {new Date().getFullYear()} &copy; All right reserved.
        </span>
      </div>
    </footer>
  )
}
