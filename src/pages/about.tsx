import { environment } from '~/config'

export default function About() {
  return (
    <main>
      <a href={`${environment.API_URL}/auth/login`}>connect</a>
    </main>
  )
}
