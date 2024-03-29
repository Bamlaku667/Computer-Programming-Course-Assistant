import { useAuth } from "./useAuthContex"

const useLogout = () => {
    const { dispatch } = useAuth()
  
    const logout = () => {
      // remove user from storage
      localStorage.removeItem('user')
  
      // dispatch logout action
      dispatch({ type: 'LOGOUT' })
    }
  
    return { logout }
  }

  export default useLogout;