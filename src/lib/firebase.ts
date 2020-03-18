import * as admin from 'firebase-admin'
import { env } from '../constants/env'

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(
      require('../../config/serviceAccount.json') as admin.ServiceAccount
    ),
    databaseURL: env.DATABSE_URL
  })
}

export const firestore = admin.firestore()
