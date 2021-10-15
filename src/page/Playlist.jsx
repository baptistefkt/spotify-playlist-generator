import { useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router'
import { Audio } from 'svg-loaders-react'
import { Button, theme } from '../styles'

const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  > div {
    width: 50%;
    margin: 0 auto;
  }
`

const LoaderContainer = styled.div`
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Playlist = () => {
  const [iframeLoaded, setIframeLoaded] = useState(false)
  let { id } = useParams()

  return (
    <Container>
      <div>
        <iframe
          src={`https://open.spotify.com/embed/playlist/${id}`}
          width="100%"
          height="500"
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media"
          style={{
            borderRadius: '4px',
            display: iframeLoaded ? 'block' : 'none',
          }}
          onLoad={() => setIframeLoaded(true)}
        />
        {!iframeLoaded && (
          <LoaderContainer>
            <Audio fill={theme.colors.lightGrey} />
          </LoaderContainer>
        )}
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <a
            href={`https://open.spotify.com/playlist/${id}`}
            target="_blank"
            rel="noreferrer"
          >
            <Button>Play on spotify</Button>
          </a>
        </div>
      </div>
    </Container>
  )
}
