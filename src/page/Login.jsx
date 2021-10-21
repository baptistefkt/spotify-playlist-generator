import styled from 'styled-components'
import { authEndpoint, clientId, redirectUri, scopes } from '../constants'
import { generateRandomString } from '../helpers'
import { Main, Button } from '../styles'

const PageContainer = styled(Main)`
  display: flex;
  justify-content: center;
  align-items: center;
  > div {
    text-align: center;
    h1 {
      font-size: 40px;
      line-height: 50px;
      margin-bottom: 50px;
    }
  }
`

const state = generateRandomString(16)
const href = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=token&show_dialog=true&state=${state}`

export const Login = () => {
  return (
    <PageContainer>
      <div>
        <h1>
          Generate playlists in no time <br /> by associating artists
        </h1>
        <a href={href}>
          <Button>LOG IN TO SPOTIFY</Button>
        </a>
      </div>
    </PageContainer>
  )
}
