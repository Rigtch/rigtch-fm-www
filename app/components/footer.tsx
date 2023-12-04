import Link from 'next/link'
import { FaDiscord, FaGithub } from 'react-icons/fa'

import { Separator } from './ui/separator'

export function Footer() {
  return (
    <footer>
      <Separator />

      <div className="p-4 flex justify-center">
        rigtch.fm &copy; {new Date().getFullYear()} |
        <Link
          href="https://discord.gg/ed2J535wzc"
          replace
          target="_blank"
          className="flex items-center px-2"
        >
          <FaDiscord />
        </Link>
        <Link
          href="https://github.com/Rigtch"
          replace
          target="_blank"
          className="flex items-center px-2"
        >
          <FaGithub />
        </Link>
      </div>
    </footer>
  )
}
