import { Button } from 'primereact/button'

export default function NotRegistered() {
  return (
    <div className="flex flex-column md:flex-row gap-8 h-full">
      <section>
        <header>
          <h1 className="text-5xl">Oops!</h1>
        </header>

        <main>
          <p>Looks like you&apos;re not registered in private beta.</p>

          <p>
            Unfortunately Spotify&apos;s user policy requires each member to be
            added to developers dashboard before being able to fully access our
            application.
          </p>

          <p>Join our discord server to apply for the private beta.</p>
        </main>

        <Button
          className="text-white"
          onClick={() => window.open('https://discord.gg/ft9RUtyfZg')}
        >
          Join
        </Button>
      </section>

      <section
        style={{ minHeight: '500px' }}
        className="flex justify-content-center "
      >
        <iframe
          title="discord"
          src="https://discord.com/widget?id=835103193381076993&theme=dark"
          width="350"
          height="250"
          className="border-round-md min-h-full"
          frameBorder="0"
          sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        />
      </section>
    </div>
  )
}
