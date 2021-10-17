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

export const ErrorPage = ({ logout = false, setToken }) => (
  <PageContainer>
    <div>
      <h1>Oops.</h1>
      <h2>Something went wrong...</h2>
      {logout ? (
        <div>
          Let&#39;s <span onClick={() => setToken(null)}>try again</span>
        </div>
      ) : (
        <div>
          Let&#39;s <Link to="/">try again</Link>
        </div>
      )}
    </div>
  </PageContainer>
)
