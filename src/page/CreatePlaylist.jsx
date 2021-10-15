import { useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import { Search, Close } from '@styled-icons/zondicons'

import { useCreatePlaylist } from '../api'
import { Button, Main, theme } from '../styles'
import placeholderImg from '../assets/uploadPlaceholder.png'
import { Loader } from '../components/Loader'

// style
const StyledFrom = styled.form`
  h1,
  h2 {
    font-size: 24px;
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 28px;
    margin: 32px 0 16px;
  }

  h2 {
    display: flex;
    justify-content: space-between;
    span {
      font-size: 16px;
      font-weight: 400;
      cursor: pointer;
      &:hover,
      &:focus {
        text-decoration: underline;
      }
    }
  }
`
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
  margin-right: 25px;
  img {
    width: 100%;
    height: 100%;
  }
`

const StyledNameInput = styled.input`
  margin: 9px 0 16px;
  display: block;
  background-color: rgba(255, 255, 255, 0.05);
  color: ${theme.colors.white};
  border: 0;
  border-radius: 4px;
  font-size: 30px;
  min-width: 600px;
  font-weight: 900;
  letter-spacing: -0.04em;
  padding: 8px 24px;
  caret-color: rgba(255, 255, 255, 0.7);
  &:focus {
    background-color: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.7);
  }
`

const StyledDescription = styled.textarea`
  margin: 9px 0 16px;
  display: block;
  background-color: rgba(255, 255, 255, 0.05);
  color: ${theme.colors.white};
  border: 0;
  border-radius: 4px;
  font-size: 18px;
  min-width: 600px;
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
`

const BottomSection = styled.section`
  display: flex;
  min-height: 420px;
  gap: 40px;
  > div {
    flex: 1;
  }
`

const StyledSearchContainer = styled.div`
  position: relative;
  width: fit-content;
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
  min-width: 370px;
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

const SearchAndResult = styled.div``

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

const RadioContainer = styled.div`
  margin-bottom: 48px;
  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  label {
    display: inline-block;
    margin-bottom: 12px;
    font-size: 18px;
    cursor: pointer;
  }
`

const FakeRadio = styled.span`
  position: relative;
  top: 1px;
  display: inline-block;
  margin-right: 4px;
  width: 15px;
  height: 15px;
  cursor: pointer;
  border-radius: 50%;
  background-color: #191414;
  border: 1px solid rgba(255, 255, 255, 0.4);
  ${(props) => props.selected && 'border: 4px solid white;'}
`

export const CreatePlaylist = ({
  token,
  userInfo,
  topArtists,
  pageLoading,
  pageError,
}) => {
  const [searchInput, setSearchInput] = useState('')
  const [result, setResult] = useState([])
  const [searchLoading, setSearchLoading] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [tracksType, setTracksType] = useState('top')
  const [selectedArtists, setSelectedArtists] = useState([])
  const artistsIds = selectedArtists.length
    ? selectedArtists.map((i) => i.id)
    : topArtists?.map((i) => i.id).slice(0, 10)

  let history = useHistory()

  const searchRef = useRef(null)

  const { createPlaylist, response, loading, error } = useCreatePlaylist(
    token,
    userInfo.id,
    userInfo.country
  )

  if (loading || pageLoading) {
    return <Loader text={loading ? 'Creating your playlist...' : undefined} />
  }

  if (error || pageError) {
    return <div>Oops, something went wrong...</div>
  }

  const myHeader = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  const searchSpotify = (e) => {
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
        .catch((err) => console.log(err))
    } else {
      setResult([])
    }
  }

  const handleSelectArtistClick = (i) => {
    setSelectedArtists((old) => [...old, i])
    setSearchInput('')
    setResult([])
    searchRef.current.focus()
  }
  const handleUnselectArtistClick = (i) => {
    setSelectedArtists((old) => old.filter((el) => el.id !== i.id))
  }

  const tooManyArtists = selectedArtists.length > 10

  const handleCreateClick = () => {
    if (!tooManyArtists) {
      createPlaylist(
        name || 'Playlist generated via Artist Playlist Generator',
        description,
        artistsIds,
        tracksType
      )
    }
  }

  return (
    <Main>
      {response ? (
        <>
          <div>Your playlist has been successfuly created</div>
          <button onClick={() => history.push(`/playlist/${response.id}`)}>
            View my playlist
          </button>
        </>
      ) : (
        <>
          <StyledFrom onSubmit={(e) => e.preventDefault()}>
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
                    onChange={(e) => setName(e.currentTarget.value)}
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
                    onChange={(e) => setDescription(e.currentTarget.value)}
                  />
                </div>
              </div>
            </FlexContainer>
            <BottomSection>
              <div>
                <h1>Add up to 10 artists to your playlist</h1>
                <SearchAndResult>
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
                        <div
                          key={i.id}
                          onClick={() => handleSelectArtistClick(i)}
                        >
                          <ImgAndName>
                            <ArtistImgContainer>
                              <img
                                src={
                                  i.images.length > 1
                                    ? i.images[1].url
                                    : placeholderImg
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
                </SearchAndResult>
              </div>
              <div>
                <h2>
                  Selected
                  <span
                    onClick={() => setSelectedArtists(topArtists?.slice(0, 10))}
                  >
                    select my top 10 artists
                  </span>
                </h2>
                <TokenContainer error={tooManyArtists}>
                  {selectedArtists.map((i) => (
                    <ArtistToken key={`selected-${i.id}`}>
                      {i.name}
                      <Close
                        size="12px"
                        onClick={() => handleUnselectArtistClick(i)}
                      />
                    </ArtistToken>
                  ))}
                </TokenContainer>
                <StyledSelectedCount error={tooManyArtists}>
                  <span>{`${selectedArtists.length}/10`}</span>
                  <span>{tooManyArtists && 'Select maximum 10 artists'}</span>
                </StyledSelectedCount>
                <RadioContainer>
                  <div>
                    <FakeRadio
                      selected={tracksType === 'top'}
                      onClick={() => setTracksType('top')}
                    />
                    <input
                      type="radio"
                      id="top"
                      name="top"
                      value="top"
                      onChange={() => setTracksType('top')}
                      checked={tracksType === 'top'}
                    />
                    <label htmlFor="top">Only top tracks</label>
                  </div>
                  <div>
                    <FakeRadio
                      selected={tracksType === 'all'}
                      onClick={() => setTracksType('all')}
                    />
                    <input
                      type="radio"
                      id="all"
                      name="all"
                      value="all"
                      onChange={() => setTracksType('all')}
                      checked={tracksType === 'all'}
                    />
                    <label htmlFor="all">All tracks</label>
                  </div>
                </RadioContainer>
                <Button onClick={handleCreateClick}>Generate playlist</Button>
              </div>
            </BottomSection>
          </StyledFrom>
        </>
      )}
    </Main>
  )
}
