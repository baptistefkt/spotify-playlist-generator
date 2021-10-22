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
  a,
  span {
    text-decoration: underline;
    cursor: pointer;
  }
`

export const ErrorPage = ({ error, setToken }) => {
  if (!error) return null
  return (
    <PageContainer>
      <div>
        <h1>Oops.</h1>
        <h2>Something went wrong...</h2>
        {error.message.includes('token') || error.message.includes('bearer') ? (
          <div>
            Let&#39;s <span onClick={() => setToken('')}>try again</span>
          </div>
        ) : (
          <div>
            Let&#39;s <Link to="/">try again</Link>
          </div>
        )}
      </div>
    </PageContainer>
  )
}
