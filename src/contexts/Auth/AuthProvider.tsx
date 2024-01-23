import React, { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import { useAppDispatch, useAppSelector } from '../../store'
import { getUserAction } from '../../store/Auth'

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const dispatch = useAppDispatch()
  const activeUser = useAppSelector((state) => state.auth.activeUser)
  const isActiveUserLoading = useAppSelector(
    (state) => state.auth.isActiveUserLoading
  )
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem('activeUser')
  )

  useEffect(() => {
    const activeId = localStorage.getItem('activeUser')
    if (activeId && !activeUser) {
      dispatch(getUserAction({ userId: activeId }))
    }
  }, [])

  const logout = () => {
    setIsLoggedIn(false)
    localStorage.removeItem('activeUser')
  }

  const login = (userId: string) => {
    setIsLoggedIn(true)
    localStorage.setItem('activeUser', userId)
  }

  const value = {
    activeUser,
    isLoggedIn,
    isActiveUserLoading,
    logout,
    login,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
