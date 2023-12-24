import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState('')
    const [token, setToken] = useState('')
    const login = data => {
        setUser(data.user)
        setToken(data.token)
    }
    const logout = () => {
        setUser(null)
        setToken(null)
    }

    return(
        <AuthContext.Provider value={{user, token, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}
