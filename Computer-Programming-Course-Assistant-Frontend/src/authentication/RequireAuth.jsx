import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuthContex'

export const RequireAuth = ({children}) => {
  const {user} = useAuth();
  console.log('user in require' , user)
  const location = useLocation()
  if (!user) {
      return <Navigate to='/login' state={{path: location.pathname}}/> 
  }
  return {children}
}
  