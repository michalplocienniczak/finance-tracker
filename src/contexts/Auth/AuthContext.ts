import { createContext, useContext } from 'react'
import { User } from '../../types'

type AuthContextProps = {
  activeUser: User | null
  isActiveUserLoading: boolean
  logout: () => void
  login: (userId: string) => void
  isLoggedIn: boolean
}

const initialAuthContext: AuthContextProps = {
  activeUser: null,
  isActiveUserLoading: false,
  // eslint-disable-next-line
  logout: () => {},
  // eslint-disable-next-line
  login: () => {},
  isLoggedIn: false,
}

export const AuthContext = createContext<AuthContextProps>(initialAuthContext)

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuthContext must be used within the AuthProvider')
  }

  return context
}
