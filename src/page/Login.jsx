import styled from 'styled-components'
import { authEndpoint, clientId, redirectUri, scopes } from '../constants'
import { generateRandomString } from '../helpers'
import { Main, Button } from '../styles'

const PageContainer = styled(Main)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const state = generateRandomString(16)
const href = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=token&show_dialog=true&state=${state}`

export const Login = () => {
  return (
    <PageContainer>
      <Button>
        <a href={href}>LOG IN TO SPOTIFY</a>
      </Button>
    </PageContainer>
  )
}
