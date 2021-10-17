import styled from 'styled-components'
import { Audio, ThreeDots } from 'svg-loaders-react'
import { mixins } from '../styles'

const MainLoaderContainer = styled.div`
  height: 100vh;
  width: 100%;
  ${mixins.flexCenter}
  > div {
    text-align: center;
    color: #555;
    font-size: 20px;
    line-height: 4;
  }
`

const InlineLoaderContainer = styled.span`
  display: inline-block;
  padding: 4px 8px;
  margin: 2px 4px;
`

export const Loader = ({ main = true, text }) => {
  return (
    <>
      {main ? (
        <MainLoaderContainer>
          <div>
            <Audio fill="#555" />
            {text && <div>{text}</div>}
          </div>
        </MainLoaderContainer>
      ) : (
        <InlineLoaderContainer>
          <ThreeDots fill="#555" width="24" height="16" />
        </InlineLoaderContainer>
      )}
    </>
  )
}
