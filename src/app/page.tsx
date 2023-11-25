import { ConnectCard } from '@components/connect/card'
import { DiscordCard } from '@components/connect/discord-card'

export default function HomePage() {
  return (
    <div className="flex flex-col gap-4 md:flex-row justify-center align-center h-full pt-6 px-4">
      <ConnectCard />

      <DiscordCard />
    </div>
  )
}
