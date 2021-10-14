export const authEndpoint = 'https://accounts.spotify.com/authorize'
export const clientId = 'aa6ef2a744544ea081c0c632c318d04b'
export const redirectUri =
  // eslint-disable-next-line no-undef
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/authorized'
    : 'https://spotify-artist-playlist-generator.netlify.app/authorized'
export const scopes =
  'user-read-private user-top-read playlist-read-private playlist-read-collaborative playlist-modify-private playlist-modify-public ugc-image-upload'
export const ONE_HOUR = 1 / 24
