import Link from 'next/link'
import { Button } from 'primereact/button'
import { Card } from 'primereact/card'

export function DiscordCard() {
  return (
    <Card className="w-full">
      <div className="align-items-center flex-column flex gap-4 md:flex-row  p-2">
        <span className="pi pi-discord" style={{ fontSize: '128px' }} />

        <div className="flex-column align-items-center justify-content-center flex gap-4 text-center w-full">
          <div className="flex-column align-items-center flex gap-2 text-center">
            <h1 className="m-0">Join our community!</h1>

            <p className="m-0">Be up to date with all the latest news</p>
          </div>

          <Link href="https://discord.gg/ft9RUtyfZg" target="_blank">
            <Button className="text-white">Join</Button>
          </Link>
        </div>
      </div>
    </Card>
  )
}
