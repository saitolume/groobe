import { CurrentUser } from '~/domains/user/model'

export type UserAction =
  | { type: 'SET_CURRENT_USER'; payload: { currentUser?: CurrentUser } }
  | { type: 'UPDATE_CURRENT_USER'; payload: Partial<CurrentUser> }

export const setCurrentUser = (currentUser?: CurrentUser): UserAction => ({
  type: 'SET_CURRENT_USER',
  payload: { currentUser }
})

export const updateCurrentUser = (attributes: Partial<CurrentUser>): UserAction => ({
  type: 'UPDATE_CURRENT_USER',
  payload: attributes
})
