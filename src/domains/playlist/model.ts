import { Track } from '~/domains/track/model'

export type Playlist = {
  id: string
  title: string
  description: string
  tracks: Track[]
  thumbnailUrl: string
  userId: string
}
