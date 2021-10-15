import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Main } from '../styles'

const PageContainer = styled(Main)`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  div {
    font-size: 18px;
  }
  h1 {
    font-size: 80px;
  }
  h2 {
    font-size: 28px;
    margin-bottom: 32px;
  }
  a {
    text-decoration: underline;
  }
`

export const NotFound = () => (
  <PageContainer>
    <div>
      <h1>Oops.</h1>
      <h2>The page you&#39;re trying to reach doesn&#39;t exist.</h2>
      <div>
        Go back to <Link to="/">Homepage</Link>
      </div>
    </div>
  </PageContainer>
)
