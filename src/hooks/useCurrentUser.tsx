import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
  Dispatch
} from 'react'
import { reducer, CurrentUser, UserState, UserAction, UserService, User } from '~/domains/user'

const CurrentUserContext = createContext<[UserState, Dispatch<UserAction>]>([
  { currentUser: undefined },
  () => undefined
])

export const CurrentUserProvider: React.FC<{ currentUser?: CurrentUser }> = ({
  children,
  currentUser
}) => {
  const [state, dispatch] = useReducer(reducer, { currentUser })

  useEffect(() => {
    if (currentUser === undefined) return
    dispatch({ type: 'SET_CURRENT_USER', payload: { currentUser } })
  }, [currentUser])

  return (
    <CurrentUserContext.Provider value={[state, dispatch]}>{children}</CurrentUserContext.Provider>
  )
}

export const useCurrentUser = () => {
  const [isLoaing, setIsLoading] = useState(false)
  const [{ currentUser }, dispatch] = useContext(CurrentUserContext)
  const userService = useRef(new UserService()).current

  const updateCurrentUser = async (payload: Partial<User> & { id: User['id'] }) => {
    setIsLoading(true)
    try {
      const user = await userService.update(payload)
      dispatch({ type: 'UPDATE_CURRENT_USER', payload: user })
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    currentUser,
    updateCurrentUser,
    isLoaing
  }
}
