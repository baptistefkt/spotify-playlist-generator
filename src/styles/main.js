import styled from 'styled-components/macro'
import media from './media'

const Main = styled.main`
  position: relative;
  width: 100%;
  margin: 0 auto;
  max-width: 1400px;
  min-height: 100vh;
  padding: 80px;
  ${media.desktop`
    padding: 60px 50px;
  `};
  ${media.tablet`
    padding: 50px 40px;
  `};
  ${media.phablet`
    padding: 30px 25px;
  `};
  ${media.phone`
    padding: 30px 12px;
  `};
  h2 {
    ${media.tablet`
      text-align: center;
    `};
  }
`

export default Main
