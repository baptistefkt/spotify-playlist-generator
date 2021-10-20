import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { CheckmarkOutline } from '@styled-icons/zondicons'
import { SecondaryButton } from '../styles'

const SuccessContainer = styled.section`
  width: fit-content;
  margin: 0 auto;
  margin-top: 25vh;
  text-align: center;
  h1 {
    margin-bottom: 32px;
    span {
      margin-right: 16px;
    }
  }
`

export const PlaylistCreated = ({ playlistId }) => {
  let history = useHistory()

  return (
    <SuccessContainer>
      <h1>
        <span>
          <CheckmarkOutline size="40px" />
        </span>
        Your playlist has been successfuly created
      </h1>
      <SecondaryButton onClick={() => history.push(`/playlist/${playlistId}`)}>
        View my playlist
      </SecondaryButton>
    </SuccessContainer>
  )
}
