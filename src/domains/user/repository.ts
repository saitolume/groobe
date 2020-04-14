import { firestore } from 'firebase-admin'
import { User, Profile } from '~/domains/user/model'
import { filterNonUndefinedParams } from '~/utils/filter'

export class UserRepository {
  private ref: firestore.CollectionReference

  constructor(firestore: firestore.Firestore) {
    this.ref = firestore.collection('users')
  }

  async find({ id }: { id: User['id'] }): Promise<User | undefined> {
    const { docs } = await this.ref.where('id', '==', id).get()
    const user = docs.length ? (docs[0].data() as User) : undefined
    return user
  }

  async create({ profile, type }: { profile: Profile; type: User['type'] }): Promise<User> {
    const user: User = {
      id: profile.id,
      name: '',
      biography: '',
      type,
      imageUrl: ''
    }
    await this.ref.add(user)
    return user
  }

  async update({ id, ...params }: Partial<User> & { id: User['id'] }) {
    const {
      docs: [doc]
    } = await this.ref.where('id', '==', id).get()

    const values = filterNonUndefinedParams(params)

    await this.ref.doc(doc.id).update({ ...values })
    const user: User = { ...(doc.data() as User), ...values }

    return user
  }
}
