import { environment } from '@config/environment'

export default function HomePage() {
  return (
    <div>
      <a href={`${environment.API_URL}/auth/login`}>connect</a>
    </div>
  )
}
