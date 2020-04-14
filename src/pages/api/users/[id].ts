import { Request, Response } from 'express'
import { UserRepository, UsersResponse, User } from '~/domains/user'
import { firestore } from '~/lib/firebase'

export default async (req: Request, res: Response<UsersResponse['id']>) => {
  const id: string = req.query.id
  const userRepository = new UserRepository(firestore)

  switch (req.method) {
    case 'GET': {
      const user = await userRepository.find({ id })
      res.json({ user })
      break
    }
    case 'PUT': {
      const params: Partial<User> = req.body
      const user = await userRepository.update({ id, ...params })
      res.json({ user })
    }
  }
}
