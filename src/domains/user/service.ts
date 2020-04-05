import { AxiosInstance } from 'axios'
import { User } from '~/domains/user/model'
import { UsersResponse } from '~/domains/user/types'

export class UserService {
  private fetch: AxiosInstance

  constructor(fetch: AxiosInstance) {
    this.fetch = fetch
  }

  async find({ id }: { id: User['id'] }): Promise<User | undefined> {
    const { data } = await this.fetch.get<UsersResponse['id']>(`/users/${id}`)
    return data.user
  }
}
