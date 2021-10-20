import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Loader } from '../components/Loader'
import { Button, mixins, SecondaryButton, theme, Main, media } from '../styles'
import placeholderImg from '../assets/placeholderImg.png'
import { ErrorPage } from './ErrorPage'

// Home style
const UserInfoContainer = styled.div`
  ${mixins.flexCenter}
  flex-direction: column;
  margin-bottom: 60px;
  h1 {
    font-size: 50px;
    font-weight: 700;
    margin: 20px 0 60px;
  }
`

const AvatarContainer = styled.div`
  width: 150px;
  height: 150px;
  img {
    border-radius: 100%;
    width: 100%;
    max-width: 100%;
    vertical-align: middle;
  }
`

const AlignRight = styled.div`
  text-align: right;
  margin-bottom: 24px;
`

const FlexContainer = styled.section`
  display: flex;
  gap: 200px;
  > div {
    flex: 1;
  }

  ${media.tablet`
    flex-direction: column;
    gap: 80px;
  `};
`

const StyledLink = styled(Link)`
  display: block;
`

const PlaylistItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  border: 1px solid transparent;
  cursor: pointer;
  border-radius: 4px;

  ${media.phone`
    padding: 8px 4px;
  `};

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  > div {
    display: flex;
    align-items: center;
  }
`

const PlaylistImgContainer = styled.div`
  width: 50px;
  height: 50px;
  margin-right: 20px;
  img {
    width: 100%;
    max-width: 100%;
    vertical-align: middle;
  }
`

const PlaylistNameAndDesc = styled.div`
  div {
    margin-bottom: 4px;
    max-width: 280px;
    ${mixins.overflowEllipsis}
    ${media.thone`
      max-width: 180px;
    `};
    ${media.tiny`
      max-width: 120px;
    `};
  }
  span {
    display: inline-block;
    font-size: 14px;
    color: ${theme.colors.lightestGrey};
    max-width: 250px;
    ${mixins.overflowEllipsis}
    ${media.thone`
      max-width: 150px;
    `};
    ${media.tiny`
      max-width: 90px;
    `};
  }
`

const PlaylistTrackNbr = styled.div`
  font-size: 14px;
  color: ${theme.colors.lightestGrey};
  text-transform: uppercase;
`

const ListTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 28px;
  text-transform: none;
  margin-bottom: 40px;
  padding: 0 16px;
`

const TopArtistItem = styled.li`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  margin: 2px 0;
`

const ArtistImgContainer = styled.div`
  width: 50px;
  height: 50px;
  margin-right: 20px;
  img {
    border-radius: 100%;
    width: 50px;
    min-width: 50px;
    height: 50px;
    vertical-align: middle;
  }
`

export const Home = ({
  setToken,
  userInfo,
  playlists,
  topArtists,
  pageLoading,
  pageError,
}) => {
  const userImgSrc =
    userInfo?.images?.length > 0 ? userInfo.images[0].url : placeholderImg
  return (
    <>
      {pageLoading && <Loader />}
      {pageError && <ErrorPage />}
      {!pageLoading && !pageError && (
        <Main>
          <AlignRight>
            <SecondaryButton onClick={() => setToken('')}>
              LOGOUT
            </SecondaryButton>
          </AlignRight>
          <UserInfoContainer>
            <AvatarContainer>
              <img src={userImgSrc} />
            </AvatarContainer>
            <h1>{userInfo?.display_name}</h1>
            <Link to="/create-playlist">
              <Button>Generate New Playlist</Button>
            </Link>
          </UserInfoContainer>
          <FlexContainer>
            {playlists && (
              <div>
                <ListTitle>Your Playlists</ListTitle>
                <ul>
                  {playlists?.map((i) => {
                    return (
                      <StyledLink key={i.id} to={`/playlist/${i.id}`}>
                        <PlaylistItem>
                          <div>
                            <PlaylistImgContainer>
                              <img
                                src={
                                  i.images.length > 1
                                    ? i.images[1].url
                                    : placeholderImg
                                }
                                alt="playlist image"
                              />
                            </PlaylistImgContainer>
                            <PlaylistNameAndDesc>
                              <div>{i.name}</div>
                              {i.description !== '' && (
                                <span>{i.description}</span>
                              )}
                            </PlaylistNameAndDesc>
                          </div>
                          <PlaylistTrackNbr>{`${i.tracks.total} tracks`}</PlaylistTrackNbr>
                        </PlaylistItem>
                      </StyledLink>
                    )
                  })}
                </ul>
              </div>
            )}
            {topArtists && (
              <div>
                <ListTitle>Your Top Artists</ListTitle>
                <ul>
                  {topArtists?.map((i) => {
                    return (
                      <TopArtistItem key={i.id}>
                        <ArtistImgContainer>
                          <img src={i.images[1].url} alt="artist picture" />
                        </ArtistImgContainer>
                        <div>{i.name}</div>
                      </TopArtistItem>
                    )
                  })}
                </ul>
              </div>
            )}
          </FlexContainer>
        </Main>
      )}
    </>
  )
}
