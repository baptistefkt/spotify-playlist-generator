import { useState } from 'react'
import styled from 'styled-components'

import { useCreatePlaylist } from '../api'
import { Button, Main } from '../styles'
import { Loader } from '../components/Loader'
import { ErrorPage } from './ErrorPage'
import { PlaylistCreated } from '../components/PlaylistCreated'
import { PlaylistInfo } from '../components/PlaylistInfo'
import { PlaylistSearch } from '../components/PlaylistSearch'
import { SelectedArtists } from '../components/SelectedArtists'
import { RadioGroup } from '../components/RadioGroup'

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

const BottomSection = styled.section`
  display: flex;
  min-height: 420px;
  gap: 40px;
  > div {
    flex: 1;
  }
`

export const CreatePlaylist = ({
  token,
  setToken,
  userInfo,
  topArtists,
  pageLoading,
  pageError,
  setLastFetchedAt,
}) => {
  const [searchInput, setSearchInput] = useState('')
  const [result, setResult] = useState([])
  const [searchLoading, setSearchLoading] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [tracksType, setTracksType] = useState('top')
  const [selectedArtists, setSelectedArtists] = useState([])
  const artistsIds = selectedArtists.map((i) => i.id)

  const { createPlaylist, response, loading, error } = useCreatePlaylist(
    token,
    userInfo.id,
    userInfo.country,
    setLastFetchedAt
  )

  if (loading || pageLoading) {
    return <Loader text={loading ? 'Creating your playlist...' : undefined} />
  }

  if (error || pageError) {
    return <ErrorPage logout={error} setToken={setToken} />
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
        <PlaylistCreated playlistId={response.id} />
      ) : (
        <>
          <StyledFrom onSubmit={(e) => e.preventDefault()}>
            <PlaylistInfo
              description={description}
              setDescription={setDescription}
              name={name}
              setName={setName}
            />
            <BottomSection>
              <PlaylistSearch
                result={result}
                setResult={setResult}
                searchInput={searchInput}
                setSearchInput={setSearchInput}
                searchLoading={searchLoading}
                setSearchLoading={setSearchLoading}
                setSelectedArtists={setSelectedArtists}
                token={token}
              />
              <div>
                <SelectedArtists
                  selectedArtists={selectedArtists}
                  setSelectedArtists={setSelectedArtists}
                  topArtists={topArtists}
                  tooManyArtists={tooManyArtists}
                />
                <RadioGroup
                  tracksType={tracksType}
                  setTracksType={setTracksType}
                />
                <Button onClick={handleCreateClick}>Generate playlist</Button>
              </div>
            </BottomSection>
          </StyledFrom>
        </>
      )}
    </Main>
  )
}
