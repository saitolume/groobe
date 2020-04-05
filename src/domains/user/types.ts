import { User } from '~/domains/user/model'

export type UsersResponse = {
  id: { user?: User }
}
