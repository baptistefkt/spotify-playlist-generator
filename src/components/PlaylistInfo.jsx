import { memo, useCallback } from 'react'
import styled, { css } from 'styled-components'
import placeholderImg from '../assets/uploadPlaceholder.png'
import { theme, media } from '../styles'

const FlexContainer = styled.div`
  display: flex;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  label {
    font-size: 12px;
    font-weight: 700;
  }
`
const UploadImgContainer = styled.div`
  width: 232px;
  height: 232px;
  vertical-align: middle;
  margin-right: 40px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  ${media.tablet`
    display: none;
  `};
`

const inputWidth = css`
  width: 500px;
  ${media.tablet`
    width: 100%;
  `};
`

const StyledNameInput = styled.input`
  margin: 9px 0 16px;
  display: block;
  background-color: rgba(255, 255, 255, 0.05);
  color: ${theme.colors.white};
  border: 0;
  border-radius: 4px;
  font-size: 30px;
  font-weight: 900;
  letter-spacing: -0.04em;
  padding: 8px 24px;
  caret-color: rgba(255, 255, 255, 0.7);
  &:focus {
    background-color: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.7);
  }
  ${inputWidth}
`

const StyledDescription = styled.textarea`
  margin: 9px 0 16px;
  display: block;
  background-color: rgba(255, 255, 255, 0.05);
  color: ${theme.colors.white};
  border: 0;
  border-radius: 4px;
  font-size: 18px;
  height: 103px;
  font-weight: 400;
  letter-spacing: -0.04em;
  padding: 8px;
  caret-color: rgba(255, 255, 255, 0.7);
  resize: none;
  &:focus {
    outline: 0;
    border: none;
    background-color: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.7);
  }
  ${inputWidth}
`

const PlaylistInfoNonMemo = ({
  description,
  setDescription,
  name,
  setName,
}) => {
  const handleNameChange = useCallback(
    (e) => setName(e.currentTarget.value),
    [setName]
  )
  const handleDescriptionChange = useCallback(
    (e) => setDescription(e.currentTarget.value),
    [setDescription]
  )

  return (
    <FlexContainer>
      <UploadImgContainer>
        <img src={placeholderImg} alt="upload placeholder image" />
      </UploadImgContainer>
      <div>
        <div>
          <label htmlFor="playlistName">PLAYLIST</label>
          <StyledNameInput
            type="text"
            name="playlistName"
            id="playlistName"
            placeholder="Choose a name"
            maxLength="100"
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <label htmlFor="playlistDescription">DESCRIPTION</label>
          <StyledDescription
            name="playlistDescription"
            id="playlistDescription"
            placeholder="Add an optional description"
            rows="3"
            maxLength="300"
            value={description}
            onChange={handleDescriptionChange}
          />
        </div>
      </div>
    </FlexContainer>
  )
}

export const PlaylistInfo = memo(PlaylistInfoNonMemo)
