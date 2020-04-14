import { Reducer } from 'react'
import { CurrentUser } from '~/domains/user/model'
import { UserAction } from '~/domains/user/action'

export type UserState = {
  currentUser?: CurrentUser
}

export const reducer: Reducer<UserState, UserAction> = (state, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        currentUser: action.payload.currentUser
      }
    case 'UPDATE_CURRENT_USER':
      if (!state.currentUser) return state
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          ...action.payload
        }
      }
    default:
      return state
  }
}
