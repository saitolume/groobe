import Spotify from 'spotify-web-api-node'
import { env } from '~/constants/env'

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = env

export const spotify = new Spotify({
  clientId: SPOTIFY_CLIENT_ID,
  clientSecret: SPOTIFY_CLIENT_SECRET
})
