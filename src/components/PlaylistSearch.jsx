import { memo, useCallback, useRef } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Search } from '@styled-icons/zondicons'

import { Loader } from './Loader'
import placeholderImg from '../assets/uploadPlaceholder.png'
import { theme, media } from '../styles'

const StyledSearchContainer = styled.div`
  position: relative;
  width: 370px;

  ${media.tablet`
    width: 100%;
  `};

  > span {
    position: absolute;
    top: 4px;
    right: 8px;
  }
`

const StyledSearchInput = styled.input`
  margin: 8px 0;
  display: block;
  background-color: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  border: 0;
  border-radius: 4px;
  font-size: 18px;
  width: 100%;
  height: 40px;
  padding: 8px 8px 8px 32px;
  caret-color: rgba(255, 255, 255, 0.7);

  &::placeholder {
    color: rgba(255, 255, 255, 1);
  }
`

const SearchIcon = styled(Search)`
  position: absolute;
  top: 14px;
  left: 10px;
  color: rgba(255, 255, 255, 0.7);
`

const StyledResultsContainer = styled.div`
  margin-top: 16px;

  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 16px 8px 8px;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }

  span {
    text-transform: uppercase;
    font-size: 14px;
    color: ${theme.colors.lightestGrey};
  }
`

const ArtistImgContainer = styled.div`
  width: 40px;
  height: 40px;
  margin-right: 20px;

  img {
    border-radius: 100%;
    width: 40px;
    min-width: 40px;
    height: 40px;
    vertical-align: middle;
  }
`

const ImgAndName = styled.div`
  display: flex;
  align-items: center;
`

const PlaylistSearchNonMemo = ({
  result,
  setResult,
  searchInput,
  setSearchInput,
  searchLoading,
  setSearchLoading,
  setSelectedArtists,
  token,
  setError,
}) => {
  const searchRef = useRef(null)

  const handleSelectArtistClick = useCallback(
    (i) => {
      setSelectedArtists((old) => [...old, i])
      setSearchInput('')
      setResult([])
      searchRef.current.focus()
    },
    [setSelectedArtists, setSearchInput, setResult, searchRef]
  )

  const searchSpotify = (e) => {
    const myHeader = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
    setSearchInput(e.currentTarget.value)
    if (e.currentTarget.value !== '') {
      setSearchLoading(true)
      axios({
        url: `https://api.spotify.com/v1/search?q=${encodeURI(
          e.currentTarget.value
        )}&type=artist&limit=5`,
        method: 'GET',
        headers: myHeader,
      })
        .then((res) => {
          setResult(res.data.artists.items)
          setSearchLoading(false)
        })
        .catch((err) => {
          setSearchLoading(false)
          setError(err.response.data.error)
        })
    } else {
      setResult([])
    }
  }

  return (
    <div>
      <h1>Add up to 10 artists to your playlist</h1>
      <div>
        <StyledSearchContainer>
          <StyledSearchInput
            type="text"
            role="searchbox"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            maxLength="80"
            placeholder="Search"
            autoComplete="new-password"
            name="spotifySearchInput"
            id="spotifySearchInput"
            value={searchInput}
            onChange={searchSpotify}
            onBeforeInput={(e) => e.currentTarget.scrollIntoView()}
            ref={searchRef}
          />
          <SearchIcon size="14px" />
          {searchLoading && (
            <span>
              <Loader main={false} />
            </span>
          )}
        </StyledSearchContainer>
        <StyledResultsContainer>
          {result.map((i) => {
            return (
              <div key={i.id} onClick={() => handleSelectArtistClick(i)}>
                <ImgAndName>
                  <ArtistImgContainer>
                    <img
                      src={
                        i.images.length > 1 ? i.images[1].url : placeholderImg
                      }
                      alt="artist image"
                    />
                  </ArtistImgContainer>
                  <div>{i.name}</div>
                </ImgAndName>
                <span>add +</span>
              </div>
            )
          })}
        </StyledResultsContainer>
      </div>
    </div>
  )
}

export const PlaylistSearch = memo(PlaylistSearchNonMemo)
