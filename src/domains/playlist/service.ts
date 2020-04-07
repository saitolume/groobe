import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { baseURL } from '~/constants'
import { Service } from '~/domains/service'
import { User } from '~/domains/user'

export class PlaylistService {
  private fetch: AxiosInstance

  constructor(options?: AxiosRequestConfig) {
    this.fetch = Axios.create({
      baseURL,
      ...options
    })
  }

  async findAll({
    type,
    userId
  }: {
    type: Service['type']
    userId: User['id']
  }): Promise<User | undefined> {
    const { data } = await this.fetch.get(`/playlists`, { params: { type, userId } })
    return data.playlists
  }
}
