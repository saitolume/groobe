import { Request, Response } from 'express'
import { Playlist } from '~/domains/playlist'
import { Service } from '~/domains/service'
import { spotify } from '~/lib/spotify'

const playlists = async (req: Request, res: Response) => {
  const type: Service['type'] = req.query.type
  const userId: string = req.query.userId
  const accessToken = req.headers.authorization || ''

  switch (type) {
    case 'apple': {
      res.end()
      break
    }
    case 'spotify': {
      spotify.setAccessToken(accessToken)
      const { body } = await spotify.getUserPlaylists(userId)
      const playlists = body.items.map(item => {
        const { url: thumbnailUrl } = item.images[0]
        const playlist: Playlist = {
          id: item.id,
          title: item.name,
          description: '',
          tracks: [],
          thumbnailUrl,
          userId: item.owner.id
        }
        return playlist
      })

      res.json(playlists)
      break
    }
  }
}

export default playlists
