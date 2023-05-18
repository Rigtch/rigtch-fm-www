import { API_URL } from '~/config'

export default function About() {
  return (
    <main>
      <a href={`${API_URL}/auth/login`}>connect</a>
    </main>
  )
}
