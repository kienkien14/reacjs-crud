import { createContext, useState } from "react"

export const AuthContext = createContext({
    auth: false,
    user: null,
    setAuth: () => { },
    setUser: () => { }
})

export const AuthProvider = ({ children }) => {
    let [auth, setAuth] = useState(false)
    let [user, setUser] = useState(null)

    return <AuthContext.Provider value={{ auth, setAuth, user, setUser }}>
        {children}
    </AuthContext.Provider>
}   