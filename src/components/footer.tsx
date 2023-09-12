import Link from 'next/link'

export function Footer() {
  return (
    <footer className="flex-col bg-gray-800 rounded-xl flex gap-3 px-4 py-4 w-full max-w-screen-2xl">
      <div className="justify-center flex w-full">
        <Link
          href="https://discord.gg/ft9RUtyfZg"
          target="_blank"
          style={{ all: 'unset', cursor: 'pointer' }}
        >
          <i className="fa-brands fa-discord"></i>
        </Link>
      </div>

      <div className="flex justify-center w-full">
        <span className="justify-center text-md flex">
          Rigtch {new Date().getFullYear()} &copy; All right reserved.
        </span>
      </div>
    </footer>
  )
}
