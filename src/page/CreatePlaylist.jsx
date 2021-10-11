import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

import { useCreatePlaylist } from '../api'

export const CreatePlaylist = ({ token, userInfo, topArtists }) => {
  const [result, setResult] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [tracksType, setTracksType] = useState('top')
  const [selectedArtists, setSelectedArtists] = useState([])
  const artistsIds = selectedArtists.length
    ? selectedArtists.map((i) => i.id)
    : topArtists?.map((i) => i.id).slice(0, 10)

  let history = useHistory()

  const { createPlaylist, response, loading, error } = useCreatePlaylist(
    token,
    userInfo.id,
    userInfo.country
  )

  if (loading) {
    return <div>creating your playlist...</div>
  }

  if (error) {
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
      axios({
        url: `https://api.spotify.com/v1/search?q=${encodeURI(
          e.currentTarget.value
        )}&type=artist&limit=5`,
        method: 'GET',
        headers: myHeader,
      }).then((res) => {
        setResult(res.data.artists.items)
      })
    } else {
      setResult([])
    }
  }

  const handleSelectArtistClick = (i) => {
    setSelectedArtists((old) => [...old, i])
    setSearchInput('')
    setResult([])
  }
  const handleUnselectArtistClick = (i) => {
    setSelectedArtists((old) => old.filter((el) => el.id !== i.id))
  }

  return (
    <>
      {response ? (
        <>
          <div>Your playlist has been successfuly created</div>
          <button onClick={() => history.push(`/playlist/${response.id}`)}>
            View my playlist
          </button>
        </>
      ) : (
        <>
          <form>
            <div>
              <label htmlFor="playlistName">PLAYLIST</label>
              <input
                type="text"
                name="playlistName"
                id="playlistName"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
              />
            </div>
            <div>
              <label htmlFor="playlistDescription">DESCRIPTION</label>
              <input
                type="text"
                name="playlistDescription"
                id="playlistDescription"
                value={description}
                onChange={(e) => setDescription(e.currentTarget.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Search for artists"
                autoComplete="new-password"
                name="spotifySearch"
                id="spotifySearch"
                value={searchInput}
                onChange={searchSpotify}
              />
            </div>
            {result.map((i) => {
              return (
                <div onClick={() => handleSelectArtistClick(i)} key={i.id}>
                  {i.name}
                </div>
              )
            })}
            <select
              name="tracksType"
              id="tracksType"
              value={tracksType}
              onChange={(e) => setTracksType(e.currentTarget.value)}
            >
              <option value="top">Only top tracks</option>
              <option value="all">All tracks</option>
            </select>
          </form>
          <h3>Selected:</h3>
          {selectedArtists.map((i) => (
            <div key={`selected-${i.id}`}>
              {i.name}{' '}
              <span onClick={() => handleUnselectArtistClick(i)}> X </span>
            </div>
          ))}
          <button
            onClick={() =>
              createPlaylist(name, description, artistsIds, tracksType)
            }
          >
            Create
          </button>
        </>
      )}
    </>
  )
}
