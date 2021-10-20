import { memo, useCallback } from 'react'
import styled from 'styled-components'
import { Close } from '@styled-icons/zondicons'

const TokenContainer = styled.div`
  min-height: 111px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  margin-bottom: 8px;
  padding: 4px;
  ${(props) => props.error && 'border-bottom: 1px solid red'}
`

const ArtistToken = styled.span`
  display: inline-block;
  padding: 6px 10px;
  margin: 4px 4px;
  background-color: rgba(255, 255, 255, 0.3);
  color: rgba(255, 255, 255, 0.7);
  border-radius: 25px;
  font-size: 11px;
  text-transform: uppercase;
  font-weight: 600;
  svg {
    cursor: pointer;
    fill: rgba(0, 0, 0, 0.5);
    position: relative;
    top: -1px;
    margin-left: 4px;
  }
`

const StyledSelectedCount = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 32px;
  font-size: 14px;
  ${(props) => props.error && 'color: red;'}
`

const SelectedArtistsNonMemo = ({
  selectedArtists,
  setSelectedArtists,
  topArtists,
  tooManyArtists,
}) => {
  const handleSelectTopArtistsClick = useCallback(
    () => setSelectedArtists(topArtists?.slice(0, 10)),
    [setSelectedArtists]
  )
  const handleUnselectArtistClick = useCallback(
    (i) => setSelectedArtists((old) => old.filter((el) => el.id !== i.id)),
    [setSelectedArtists]
  )

  return (
    <>
      <h2>
        Selected
        <span onClick={handleSelectTopArtistsClick}>
          select my top 10 artists
        </span>
      </h2>
      <TokenContainer error={tooManyArtists}>
        {selectedArtists.map((i) => (
          <ArtistToken key={`selected-${i.id}`}>
            {i.name}
            <Close size="12px" onClick={() => handleUnselectArtistClick(i)} />
          </ArtistToken>
        ))}
      </TokenContainer>
      <StyledSelectedCount error={tooManyArtists}>
        <span>{`${selectedArtists.length}/10`}</span>
        <span>{tooManyArtists && 'Select maximum 10 artists'}</span>
      </StyledSelectedCount>
    </>
  )
}

export const SelectedArtists = memo(SelectedArtistsNonMemo)
