import { authEndpoint, clientId, redirectUri, scopes } from '../constants'
import { generateRandomString } from '../helpers'

const state = generateRandomString(16)
const href = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=token&show_dialog=true&state=${state}`

export const Login = () => {
  return (
    <div>
      <button>
        <a href={href}>LOG IN TO SPOTIFY</a>
      </button>
    </div>
  )
}
